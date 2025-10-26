const dotenv = require('dotenv')

dotenv.config()

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7001,http://localhost:9000"

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000,http://localhost:4321"

// Database URL
const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-store"

// Redis URL
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379"

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  },
  plugins: [
    `medusa-fulfillment-manual`,
    `medusa-payment-manual`,
    {
      resolve: `medusa-payment-stripe`,
      options: {
        api_key: process.env.STRIPE_API_KEY,
        webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
      },
    },
    {
      resolve: "@medusajs/admin",
      options: {
        autoRebuild: true,
        develop: {
          open: process.env.OPEN_BROWSER !== "false",
        },
      },
    },
  ],
  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: REDIS_URL
      }
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: REDIS_URL,
        ttl: 30,
      }
    },
  },
}
