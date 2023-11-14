const isProd = process.env.NODE_ENV === "production";
const subPath = "";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  ssr: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    baseURL: isProd ? subPath : "",
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "./faith_favicon.svg" },
      ],
    },
  },
  nitro: {
    output: {
      publicDir: "./registration",
    },
  },
});
