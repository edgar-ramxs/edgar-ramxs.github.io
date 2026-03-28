import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';


export default defineConfig({
  site: 'https://edgar-ramxs.github.io',

  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
        proxyArgs: true,
      },
    }),
  ],

  vite: {},
});