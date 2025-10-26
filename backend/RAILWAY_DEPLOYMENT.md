# Railway Deployment Guide for Soul Miners Backend

## Prerequisites
1. Railway account created at [railway.app](https://railway.app)
2. Railway CLI installed: `npm install -g @railway/cli`
3. Logged in to Railway: `railway login`

## Initial Setup

### 1. Create Railway Project
```bash
cd backend
railway init
```

### 2. Add PostgreSQL Database
In Railway Dashboard:
- Click "New Service" → "Database" → "PostgreSQL"
- Railway will automatically provision a PostgreSQL database
- Copy the `DATABASE_URL` from the PostgreSQL service variables

### 3. Add Redis
In Railway Dashboard:
- Click "New Service" → "Database" → "Redis"
- Railway will automatically provision a Redis instance
- Copy the `REDIS_URL` from the Redis service variables

### 4. Configure Environment Variables
In your Railway service, add the following environment variables:

```env
# Database (automatically provided by Railway PostgreSQL)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Redis (automatically provided by Railway Redis)
REDIS_URL=${{Redis.REDIS_URL}}

# Medusa Backend URL (update with your Railway domain)
MEDUSA_BACKEND_URL=https://your-backend-service.up.railway.app
NODE_ENV=production

# CORS Settings (update with your frontend URL)
STORE_CORS=https://your-frontend.vercel.app
ADMIN_CORS=https://your-admin.vercel.app
AUTH_CORS=https://your-admin.vercel.app

# Security (CHANGE THESE!)
JWT_SECRET=your-production-jwt-secret-at-least-32-characters
COOKIE_SECRET=your-production-cookie-secret-at-least-32-characters

# Stripe Payment
STRIPE_API_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Admin User
ADMIN_EMAIL=admin@soul-miners.com
ADMIN_PASSWORD=your-secure-admin-password
```

## Deployment

### Option 1: Deploy via Railway CLI
```bash
cd backend
railway up
```

### Option 2: Deploy via GitHub
1. Push your code to GitHub
2. In Railway Dashboard, connect your GitHub repository
3. Select the branch to deploy
4. Railway will automatically detect the Dockerfile and deploy

## Post-Deployment

### 1. Run Database Migrations
```bash
railway run npm run migrate
```

### 2. Seed Initial Data (Optional)
```bash
railway run npm run seed
```

### 3. Create Admin User
Access your admin panel at `https://your-backend-service.up.railway.app/app` and create your first admin user.

## Monitoring

- View logs: `railway logs`
- Check deployment status in Railway Dashboard
- Monitor database and Redis metrics in their respective service tabs

## Updating Environment Variables

```bash
# Set a variable
railway variables set KEY=value

# List all variables
railway variables

# Remove a variable
railway variables delete KEY
```

## Custom Domain (Optional)

1. In Railway Dashboard, go to your backend service
2. Click "Settings" → "Networking" → "Custom Domain"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `MEDUSA_BACKEND_URL` environment variable with your custom domain

## Troubleshooting

- **Build Failures**: Check Railway logs for errors
- **Database Connection Issues**: Verify `DATABASE_URL` is correctly set
- **Redis Connection Issues**: Verify `REDIS_URL` is correctly set
- **CORS Errors**: Update CORS environment variables with correct frontend URLs

## Rolling Back

```bash
# View deployments
railway status

# Rollback to previous deployment
railway rollback
```
