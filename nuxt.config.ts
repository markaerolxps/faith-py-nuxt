const isProd = process.env.NODE_ENV === "production";
const subPath = "/assets/faith_academy/registration";
import { resolve } from "path";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: true,
  hooks: {
    "pages:extend"(pages) {
      pages.push(
        {
          name: "mainPage",
          path: "/",
          file: resolve(__dirname, "./pages/index.vue"),
        },
        {
          name: "registerPage",
          path: "/index.html",
          file: resolve(__dirname, "./pages/index.vue"),
        },
        {
          name: "mainSuccessPage",
          path: "/success",
          file: resolve(__dirname, "./pages/success.vue"),
        },
        {
          name: "successPage",
          path: "/success.vue",
          file: resolve(__dirname, "./pages/success.vue"),
        },
        {
          name: "mainPageExpired",
          path: "/page-expired",
          file: resolve(__dirname, "./pages/page-expired.vue"),
        },
        {
          name: "pageExpired",
          path: "/page-expired.vue",
          file: resolve(__dirname, "./pages/page-expired.vue"),
        },
        {
          name: "main404Page",
          path: "/404",
          file: resolve(__dirname, "./pages/404.vue"),
        },
        {
          name: "404Page",
          path: "/404.vue",
          file: resolve(__dirname, "./pages/404.vue"),
        }
      );
    },
  },
  router: {
    options: {
      strict: true,
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
