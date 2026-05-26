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
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()],

  markdown: { syntaxHighlight: false },

  security: {
    csp: {
      scriptDirective: {
        resources: [
          "'self'",
          "https://app.cal.com",
          "https://policies.termageddon.com",
          "https://embed.termageddon.com",
        ]
      },
      styleDirective: {
        resources: ["'self'", "'unsafe-hashes'"],
        hashes: [
          "sha256-RVpWeEz3hQzkJJVxztU8s1MWbHR1hjqtFVQq50Nxx+I=", // Cookie policy
          "sha256-Swv9XbR7X2paGinCmThtC8t07DPnRDyoFlbjME7sSHM=", // project planning call
          "sha256-52tton/h7OvNFwoVqC+ZKH57c4fgMf7P1L+0dna8vKk=", // Privacy policy
          "sha256-Ss5hwC5sL2PN1wNBGXA+2lWuyusw8F8KPAkbI6QOMYc=", // Terms & Conditions
          "sha256-zfpOhcGweVWo7ZtcHIsq2c9xTES67fBCMf/fBr2I5Tw=", //disclaimer
        ]
      },
      directives: [
        "connect-src 'self' https://app.cal.com https://cloudflareinsights.com https://embed.termageddon.com",
        "img-src 'self' data:",
        "font-src 'self'",
      ]
    }
  },

});