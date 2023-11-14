import type { buildAssetsDir } from 'nuxt/dist/core/runtime/nitro/paths';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ssr: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    baseURL: '/assets/faith_academy/registration',
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: './faith_favicon.svg' }],
    }
  },
});
