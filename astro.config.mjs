import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

export default defineConfig({
  site: "https://edgar-ramxs.github.io",

  integrations: [icon()],

  prefetch: false,

  vite: {
    resolve: {
      alias: {
        "@utils": join(dirname(fileURLToPath(import.meta.url)), "src/utils"),
      },
    },
  },
});
