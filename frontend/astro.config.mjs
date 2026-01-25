// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://soulminerseden.com',
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});