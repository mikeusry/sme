/**
 * Business Info — Single Source of Truth
 *
 * Every component imports from here. Never hardcode phone, address, or
 * business details elsewhere in the codebase.
 */

export const business = {
  name: "Soul Miner's Eden",
  legalEntity: "Soul Miners Company",
  tagline: "A regenerative farm in Bogart, Georgia.",
  parentCompany: "A Southland Organics Company",

  phone: "(706) 613-4415",
  phoneHref: "tel:+17066134415",

  email: "farm@soulminerseden.com",
  emailAction: "/contact", // all contact funneled through web forms

  address: {
    street: "189 Luke Road",
    city: "Bogart",
    state: "GA",
    zip: "30622",
    full: "189 Luke Road, Bogart, GA 30622",
    county: "Oconee County",
    nearestCity: "Athens",
  },

  url: "https://www.soulminerseden.com",

  hours: {
    display: "Mon–Sat, 8am–6pm",
    honorStand: "Honor system — self-serve",
    note: "Farm stand coming soon",
  },

  geo: {
    lat: 33.9451,
    lng: -83.5274,
  },
} as const;

export type Business = typeof business;
