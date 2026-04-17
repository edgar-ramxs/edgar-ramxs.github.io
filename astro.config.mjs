import { defineConfig } from 'astro/config';
import icon from 'astro-icon';


export default defineConfig({
  site: 'https://edgar-ramxs.github.io',

  integrations: [
    icon(),
  ],

  vite: {},
});