/**
 * Write a paid farm ticket into the Nexus SME tenant.
 * Andi works pickups there. Failure must not fail Stripe fulfillment.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const SME_URL =
  import.meta.env.SME_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SME_SUPABASE_URL ||
  'https://vsgfoboyirpdkzcqzwvl.supabase.co'
const SME_KEY = import.meta.env.SME_SUPABASE_SERVICE_ROLE_KEY || ''

const EA_UOM_ID = '0f1b8ac1-9d50-4eac-8cf9-95498f3dee81'
const SOUL_MINERS_BRAND_ID = '69b91941-a6fd-49e7-be50-9b9c041be41a'

const HANDLE_TO_SKU: Record<string, string> = {
  'humus-compost': 'SME-COMPOST',
  compost: 'SME-COMPOST',
  'double-ground-hardwood-mulch': 'SME-DGHM',
  'brown-mulch': 'SME-MULCH-BRN',
  'pine-bark-mulch': 'SME-PINEBARK',
  'black-mulch': 'SME-MULCH-BLK',
  'red-mulch': 'SME-MULCH-RED',
  'single-ground-mulch': 'SME-MULCH-SG',
  'wood-chips': 'SME-CHIPS',
  topsoil: 'SME-TOPSOIL',
  'bioretention-soil': 'SME-BIORETEN',
  'sod-soil': 'SME-SODBLEND',
  'used-artificial-turf': 'SME-TURF',
  'compost-blend': 'SME-TSCOMPOST',
}

export type FarmOrderItem = {
  title: string
  quantity: number
  unitPriceDollars: number
  handle?: string
  sku?: string
}

export type FarmOrderInput = {
  stripeSessionId: string
  medusaOrderId: string
  email: string
  name: string
  phone?: string
  notes?: string
  totalDollars: number
  items: FarmOrderItem[]
  fulfillment: 'pickup' | 'delivery'
}

export type NexusFarmOrder = {
  id: string
  orderNumber: string
}

function sme(): SupabaseClient | null {
  if (!SME_KEY) {
    console.warn('[NEXUS] SME_SUPABASE_SERVICE_ROLE_KEY is not set — skip ticket')
    return null
  }
  return createClient(SME_URL, SME_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

function inferSku(item: FarmOrderItem): string | null {
  const handle = (item.handle || '').toLowerCase().replace(/^\/|\/$/g, '')
  if (handle && HANDLE_TO_SKU[handle]) return HANDLE_TO_SKU[handle]
  if (item.sku && HANDLE_TO_SKU[item.sku]) return HANDLE_TO_SKU[item.sku]

  const t = `${item.title} ${item.sku || ''} ${handle}`.toLowerCase()
  if (t.includes('humus') || (t.includes('compost') && !t.includes('blend') && !t.includes('topsoil'))) {
    return 'SME-COMPOST'
  }
  if (t.includes('compost') && (t.includes('blend') || t.includes('topsoil'))) return 'SME-TSCOMPOST'
  if (t.includes('double ground') || t.includes('dgh')) return 'SME-DGHM'
  if (t.includes('brown') && t.includes('mulch')) return 'SME-MULCH-BRN'
  if (t.includes('black') && t.includes('mulch')) return 'SME-MULCH-BLK'
  if (t.includes('red') && t.includes('mulch')) return 'SME-MULCH-RED'
  if (t.includes('pine bark')) return 'SME-PINEBARK'
  if (t.includes('single ground')) return 'SME-MULCH-SG'
  if (t.includes('wood chip')) return 'SME-CHIPS'
  if (t.includes('bioretention')) return 'SME-BIORETEN'
  if (t.includes('sod')) return 'SME-SODBLEND'
  if (t.includes('turf')) return 'SME-TURF'
  if (t.includes('topsoil')) return 'SME-TOPSOIL'
  return null
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
}

export async function writeNexusFarmOrder(input: FarmOrderInput): Promise<NexusFarmOrder | null> {
  const client = sme()
  if (!client) return null
  if (!input.items.length) {
    console.warn('[NEXUS] No line items — skip ticket')
    return null
  }

  const existing = await client
    .from('orders')
    .select('id, order_number')
    .eq('external_order_id', input.stripeSessionId)
    .maybeSingle()

  if (existing.data?.id) {
    return { id: existing.data.id, orderNumber: existing.data.order_number }
  }

  const products = await client.from('products').select('id, name, sku')
  if (products.error) throw new Error(products.error.message)
  const bySku = new Map((products.data || []).map((p) => [p.sku, p]))

  const { data: orderNumber, error: rpcError } = await client.rpc('generate_order_number')
  if (rpcError) throw new Error(rpcError.message)

  const customerId = await findOrCreateCustomer(client, input)
  if (!customerId) throw new Error('Nexus customer is required')
  const notes = [
    input.notes && `Pickup note: ${input.notes}`,
    `Paid on soulminerseden.com. Medusa ${input.medusaOrderId}.`,
  ]
    .filter(Boolean)
    .join('\n')

  const { data: order, error: orderError } = await client
    .from('orders')
    .insert({
      order_number: orderNumber || `SO-WEB-${Date.now()}`,
      customer_id: customerId,
      customer_name: input.name || input.email || 'Website customer',
      customer_email: input.email || null,
      source_system: 'soulminerseden',
      order_source: 'soulminerseden',
      status: 'confirmed',
      payment_status: 'paid',
      order_date: new Date().toISOString().slice(0, 10),
      external_order_id: input.stripeSessionId,
      customer_po: input.medusaOrderId,
      internal_notes: notes,
      customer_notes: input.notes || null,
      subtotal: input.totalDollars,
      order_discount_percent: 0,
      order_discount_amount: 0,
      shipping_amount: 0,
      total_amount: input.totalDollars,
      fulfillment_type: input.fulfillment === 'delivery' ? 'local_delivery' : 'local_pickup',
      is_dropship: false,
      ship_to_name: input.name || null,
      ship_to_email: input.email || null,
      ship_to_phone: input.phone || null,
      ship_to_address1: '189 Luke Rd',
      ship_to_city: 'Bogart',
      ship_to_state: 'GA',
      ship_to_zip: '30622',
      ship_to_country: 'US',
      landing_page: 'https://www.soulminerseden.com/products/compost/',
    })
    .select('id, order_number')
    .single()

  if (orderError || !order) {
    if (orderError?.code === '23505') {
      const again = await client
        .from('orders')
        .select('id, order_number')
        .eq('external_order_id', input.stripeSessionId)
        .maybeSingle()
      if (again.data?.id) {
        return { id: again.data.id, orderNumber: again.data.order_number }
      }
    }
    throw new Error(orderError?.message || 'Nexus order insert failed')
  }

  const lines = input.items.map((item, index) => {
    const sku = inferSku(item)
    const product = (sku && bySku.get(sku)) || null
    const qty = item.quantity || 1
    const unit = item.unitPriceDollars
    return {
      order_id: order.id,
      line_number: index + 1,
      product_id: product?.id || null,
      product_sku: product?.sku || sku || item.sku || null,
      product_name: product?.name || item.title,
      quantity: qty,
      quantity_ordered: qty,
      uom_id: EA_UOM_ID,
      uom_code: 'ea',
      list_price: unit,
      unit_price: unit,
      discount_percent: 0,
      discount_amount: 0,
      unit_cost: 0,
      line_total: Math.round(unit * qty * 100) / 100,
      status: 'pending',
      line_fulfillment_type: 'warehouse',
      fulfillment_status: 'pending',
    }
  })

  const { error: linesError } = await client.from('order_lines').insert(lines)
  if (linesError) {
    await client.from('orders').delete().eq('id', order.id)
    throw new Error(linesError.message)
  }

  return { id: order.id, orderNumber: order.order_number }
}

async function findOrCreateCustomer(
  client: SupabaseClient,
  input: FarmOrderInput
): Promise<string | null> {
  const email = input.email.trim().toLowerCase()
  const externalId = email ? `soulminerseden:${email}` : `soulminerseden:${input.stripeSessionId}`

  if (email) {
    const byEmail = await client.from('customers').select('id').eq('email', email).maybeSingle()
    if (byEmail.data?.id) return byEmail.data.id
  }

  const byExternal = await client
    .from('customers')
    .select('id')
    .eq('external_id', externalId)
    .maybeSingle()
  if (byExternal.data?.id) return byExternal.data.id

  const name = input.name.trim() || email || 'Website customer'
  const slug = `${slugify(name) || 'customer'}-eden-${input.stripeSessionId.slice(-8).toLowerCase()}`

  const { data, error } = await client
    .from('customers')
    .insert({
      name,
      slug,
      customer_type: 'retail',
      email: email || null,
      phone: input.phone || null,
      external_id: externalId,
      brand_id: SOUL_MINERS_BRAND_ID,
      is_active: true,
    })
    .select('id')
    .single()

  if (error || !data) {
    throw new Error(error?.message || 'Nexus customer create failed')
  }
  return data.id
}
