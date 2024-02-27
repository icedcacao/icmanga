// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    mongoUri: process.env.NUXT_MONGO_URI,
    sortingOrder: [
      { updated_at: -1 },
      { favorite_count: -1 },
      { rating: -1 },
      { chapter_count: -1 },
    ],
    searchMinLimit: 1,
    searchMaxLimit: 50,
  },
});
