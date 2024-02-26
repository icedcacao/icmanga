// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    mongoUri: process.env.NUXT_MONGO_URI,
    sortingOrder: [
      { chapter_count: -1 },
      { rating: -1 },
      { favorite: -1 },
      { updated_at: -1 },
    ],
    badRequestError: {
      statusCode: 400,
      statusMessage: "Bad Request",
    },
    searchLimit: 50,
  },
});
