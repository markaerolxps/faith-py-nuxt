// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["vue-recaptcha/nuxt"],
  runtimeConfig: {
    public: {
      recaptcha: {
        v2SiteKey: "6LdEI7cmAAAAAAtDpGiownF3Q-nQPUb43zm8vkim",
        v3SiteKey: "6LdEI7cmAAAAAAtDpGiownF3Q-nQPUb43zm8vkim",
      },
    },
  },
  recaptcha: {
    enterprise: true,
  },
  ssr: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
