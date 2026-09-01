// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.soulminerseden.com',
  adapter: vercel(),
  redirects: {
    '/products/humus-compost': '/products/compost/',
    '/products/humus-compost/': '/products/compost/',
    '/sitemap.xml': '/sitemap-index.xml',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/') && !page.includes('/humus-compost'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});