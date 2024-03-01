// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    mongoUri: process.env.NUXT_MONGO_URI,
    sortingOrder: {
      updatedDes: { updated_at: -1 },
      favoriteDes: { favorite_count: -1 },
      ratingDes: { rating: -1 },
      chapterDes: { chapter_count: -1 },
    },
    searchLimit: {
      min: 1,
      max: 50,
    },
    mangaOption: {
      minimal: {
        title: 1,
        authors: 1,
        status: 1,
        last_chapter: 1,
        cover_image_url: 1,
        description: 1,
        tags: 1,
        rating: 1,
        favorite_count: 1,
        updated_at: 1,
      },
      search: {
        title: 1,
        authors: 1,
        status: 1,
        cover_image_url: 1,
      },
    },
  },
});
