import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
// import sitemap from '@astrojs/sitemap';
// import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://edgar-ramxs.github.io',
  integrations: [
    // mdx(),
    // sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
        proxyArgs: true,
      },
    }),
  ],
});
