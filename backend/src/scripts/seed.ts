import { ExecArgs } from "@medusajs/framework/types";
import {
  createAdminUserWorkflow,
  createDefaultStoreWorkflow,
  createDefaultsWorkflow,
  createRegionsWorkflow,
  createShippingOptionsWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function seed({ container }: ExecArgs) {
  // Create store defaults
  await createDefaultsWorkflow(container).run();

  // Create default store
  await createDefaultStoreWorkflow(container).run({
    input: {
      name: "Soul Miner's Eden",
      supported_currencies: [
        { currency_code: "usd", is_default: true },
      ],
    },
  });

  // Create US region
  const { result: regions } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "United States",
          currency_code: "usd",
          countries: ["us"],
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });

  const usRegion = regions[0];

  // Create shipping options
  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: usRegion.fulfillment_sets?.[0]?.service_zones?.[0]?.id || "",
        type: {
          code: "standard",
          label: "Standard Shipping",
          description: "5-7 business days",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 800,
          },
        ],
      },
      {
        name: "Local Delivery - Athens Area",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: usRegion.fulfillment_sets?.[0]?.service_zones?.[0]?.id || "",
        type: {
          code: "local",
          label: "Local Delivery",
          description: "Same-day local delivery",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 500,
          },
        ],
      },
    ],
  });

  // Create admin user
  await createAdminUserWorkflow(container).run({
    input: {
      email: process.env.ADMIN_EMAIL || "admin@soulminerseden.com",
      password: process.env.ADMIN_PASSWORD || "supersecret",
    },
  });

  console.log("Seed completed successfully!");
}
