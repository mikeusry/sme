#!/usr/bin/env node

/**
 * Soul Miner's Eden - Product Import Script
 *
 * Imports products from crawl data into Medusa v2
 *
 * Usage:
 *   node scripts/import-products.js
 *
 * Required env vars:
 *   MEDUSA_BACKEND_URL - Backend URL (default: https://backend-production-2bafd.up.railway.app)
 *   MEDUSA_ADMIN_EMAIL - Admin email
 *   MEDUSA_ADMIN_PASSWORD - Admin password
 */

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'https://backend-production-2bafd.up.railway.app';

// Products from crawl data with pricing
const products = [
  {
    title: "Humus Compost",
    handle: "humus-compost",
    description: "Crafted on-site from green waste and food scraps under strict quality controls. Free of biosolids and meets Organic Standards and Certified Naturally Grown criteria. Rich, dark brown with a fine, crumbly texture.",
    status: "published",
    category: "Compost",
    price: 4500, // $45.00 per yard in cents
    unit: "yard"
  },
  {
    title: "CompostNow Vegetative Compost",
    handle: "compostnow-vegetative-compost",
    description: "Made from 100% plant-based food scraps and yard waste. Rich, dark brown with a fine, crumbly texture. Ideal for large-scale projects.",
    status: "published",
    category: "Compost",
    price: 8000, // $80.00 per yard
    unit: "yard"
  },
  {
    title: "Premium Topsoil",
    handle: "topsoil",
    description: "Nutrient-rich topsoil packed with essential organic matter to support plant health and vigorous growth. Loamy texture balances sand, silt and clay for optimal aeration and drainage.",
    status: "published",
    category: "Soil",
    price: 3500, // $35.00 per yard (estimated)
    unit: "yard"
  },
  {
    title: "Double Ground Hardwood Mulch",
    handle: "double-ground-hardwood-mulch",
    description: "Premium double-ground mulch with finer texture and uniform appearance. Provides a polished, professional look for garden beds and pathways. Excellent for moisture retention and weed control.",
    status: "published",
    category: "Mulch",
    price: 3500, // $35.00 per yard (estimated)
    unit: "yard"
  },
  {
    title: "Brown Mulch",
    handle: "brown-mulch",
    description: "Adds a warm, earthy tone to your garden that complements plants and trees. Made from hardwood and dyed with non-toxic, environmentally friendly colorants. Long-lasting color.",
    status: "published",
    category: "Mulch",
    price: 4000, // $40.00 per yard (estimated)
    unit: "yard"
  },
  {
    title: "Pine Bark Mulch",
    handle: "pine-bark-mulch",
    description: "Eco-friendly organic mulch made from shredded pine tree bark. Enriches soil with organic matter as it decomposes. Ideal for acid-loving plants like azaleas, rhododendrons, and blueberries.",
    status: "published",
    category: "Mulch",
    price: 4500, // $45.00 per yard (estimated)
    unit: "yard"
  },
  {
    title: "Black Mulch",
    handle: "black-mulch",
    description: "Striking deep, rich black color that enhances the beauty of any garden. Dyed with non-toxic, environmentally safe colorants. Excellent moisture retention and weed suppression.",
    status: "published",
    category: "Mulch",
    price: 4000, // $40.00 per yard (estimated)
    unit: "yard"
  },
  {
    title: "Red Mulch",
    handle: "red-mulch",
    description: "Vibrant red mulch that creates a striking contrast with green foliage. Colored with safe, non-toxic dyes that are long-lasting and eco-friendly. Great for eye-catching landscapes.",
    status: "published",
    category: "Mulch",
    price: 4000, // $40.00 per yard (estimated)
    unit: "yard"
  },
  {
    title: "Wood Chips",
    handle: "wood-chips",
    description: "Natural wood chips with rustic appearance. Long-lasting, decomposes slowly for extended durability. Ideal for pathways, playgrounds, and erosion control.",
    status: "published",
    category: "Mulch",
    price: 2500, // $25.00 per yard (estimated)
    unit: "yard"
  },
  {
    title: "Single Ground Mulch",
    handle: "single-ground-mulch",
    description: "Coarse texture mulch ideal for erosion control and large-scale projects. Cost-effective option with excellent durability. Great for commercial landscaping.",
    status: "published",
    category: "Mulch",
    price: 2800, // $28.00 per yard (estimated)
    unit: "yard"
  },
  {
    title: "Bioretention Soil",
    handle: "bioretention-soil",
    description: "Custom engineered mix of sand, organic matter and soil designed for stormwater management. Perfect for rain gardens, bioswales, and retention basins.",
    status: "published",
    category: "Soil",
    price: 6500, // $65.00 per yard (estimated)
    unit: "yard"
  },
  {
    title: "Sod Soil",
    handle: "sod-soil",
    description: "Specialty soil designed for sod installation and lawn repair. Nutrient-rich with loamy texture for optimal root establishment. Weed-free base for new lawns.",
    status: "published",
    category: "Soil",
    price: 4000, // $40.00 per yard (estimated)
    unit: "yard"
  },
  {
    title: "Used Artificial Turf",
    handle: "used-turf",
    description: "Affordable, eco-friendly used artificial turf. Perfect for residential yards, sports fields, playgrounds, and pet areas. Low maintenance - no mowing, watering, or fertilizing required.",
    status: "published",
    category: "Specialty",
    price: 200, // $2.00 per sq ft (estimated)
    unit: "sq ft"
  }
];

let authToken = null;

async function login(email, password) {
  console.log('Authenticating...');

  const response = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Login failed: ${response.status} - ${error}`);
  }

  const data = await response.json();
  authToken = data.token;
  console.log('Authenticated successfully');
  return authToken;
}

async function createProduct(product) {
  console.log(`Creating product: ${product.title}`);

  // Create the product
  const productResponse = await fetch(`${BACKEND_URL}/admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      title: product.title,
      handle: product.handle,
      description: product.description,
      status: product.status,
      options: [
        {
          title: "Quantity",
          values: ["1 " + product.unit]
        }
      ],
      variants: [
        {
          title: "Default",
          prices: [
            {
              amount: product.price,
              currency_code: "usd"
            }
          ],
          options: {
            "Quantity": "1 " + product.unit
          },
          manage_inventory: false
        }
      ]
    }),
  });

  if (!productResponse.ok) {
    const error = await productResponse.text();
    console.error(`Failed to create ${product.title}: ${error}`);
    return null;
  }

  const data = await productResponse.json();
  console.log(`Created: ${product.title} (ID: ${data.product?.id})`);
  return data.product;
}

async function main() {
  const email = process.env.MEDUSA_ADMIN_EMAIL;
  const password = process.env.MEDUSA_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Missing MEDUSA_ADMIN_EMAIL or MEDUSA_ADMIN_PASSWORD');
    console.log('\nUsage:');
    console.log('  MEDUSA_ADMIN_EMAIL=your@email.com MEDUSA_ADMIN_PASSWORD=yourpass node scripts/import-products.js');
    process.exit(1);
  }

  try {
    await login(email, password);

    console.log(`\nImporting ${products.length} products...\n`);

    let created = 0;
    let failed = 0;

    for (const product of products) {
      try {
        const result = await createProduct(product);
        if (result) {
          created++;
        } else {
          failed++;
        }
      } catch (err) {
        console.error(`Error creating ${product.title}: ${err.message}`);
        failed++;
      }

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
    }

    console.log(`\n========================================`);
    console.log(`Import complete!`);
    console.log(`  Created: ${created}`);
    console.log(`  Failed: ${failed}`);
    console.log(`========================================`);

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
