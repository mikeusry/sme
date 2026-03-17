/**
 * Klaviyo Integration
 *
 * Subscribes contacts to Klaviyo lists via the server-side API.
 * Used by contact/signup forms to build the SME email list.
 *
 * API docs: https://developers.klaviyo.com/en/reference/
 */

const KLAVIYO_API = 'https://a.klaviyo.com/api';
const API_REVISION = '2024-02-15';

// SME list ID — "Soul Miners Eden - All Signups"
const SME_LIST_ID = 'Rnef8b';

interface SubscribeOptions {
  email: string;
  name?: string;
  phone?: string;
  source?: string;
}

/**
 * Subscribe a contact to the SME Klaviyo list.
 * Creates or updates the profile, then adds to the list.
 */
export async function subscribeToList({ email, name, phone, source }: SubscribeOptions): Promise<{ success: boolean; message: string }> {
  const apiKey = import.meta.env.KLAVIYO_API_KEY;

  if (!apiKey) {
    console.warn('[KLAVIYO] API key not configured — skipping subscribe');
    return { success: false, message: 'Klaviyo not configured' };
  }

  try {
    // Split name into first/last
    const nameParts = (name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Subscribe to list (creates profile if needed)
    const res = await fetch(`${KLAVIYO_API}/lists/${SME_LIST_ID}/relationships/profiles/`, {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${apiKey}`,
        'Content-Type': 'application/json',
        'revision': API_REVISION,
      },
      body: JSON.stringify({
        data: [{
          type: 'profile',
          attributes: {
            email,
            ...(firstName && { first_name: firstName }),
            ...(lastName && { last_name: lastName }),
            ...(phone && { phone_number: phone }),
            properties: {
              source: source || 'website',
              brand: 'Soul Miners Eden',
            },
          },
        }],
      }),
    });

    if (res.ok || res.status === 202 || res.status === 204) {
      console.log(`[KLAVIYO] Subscribed ${email} to SME list (source: ${source})`);
      return { success: true, message: 'Subscribed' };
    }

    const errorText = await res.text();
    console.error(`[KLAVIYO] Error ${res.status}:`, errorText);
    return { success: false, message: `Klaviyo error: ${res.status}` };
  } catch (err) {
    console.error('[KLAVIYO] Subscribe failed:', err);
    return { success: false, message: err instanceof Error ? err.message : 'Unknown error' };
  }
}
