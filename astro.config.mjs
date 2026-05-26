// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

const isProd = process.env.CF_PAGES_BRANCH === 'main';
const SITE_URL = isProd
  ? 'https://webchargedsolutions.com'
  : (process.env.CF_PAGES_URL || 'https://webchargedsolutions.com');

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  vite: {
    plugins: [tailwindcss()],
    build: {
      inlineScriptsThreshold: 0
    }
  },

  integrations: [sitemap()],

  markdown: { syntaxHighlight: false },
});