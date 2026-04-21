// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

const SITE_URL = process.env.CF_PAGES_URL || 'https://webchargedsolutions.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});