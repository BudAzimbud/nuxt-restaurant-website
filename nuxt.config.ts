import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  
  css: ['./app/assets/css/main.css'],
  
  // Runtime config: public values are exposed to the client via useRuntimeConfig().public
  runtimeConfig: {
    public: {
      // Use environment variable when available, otherwise fallback to TheMealDB sample API
      apiBaseUrl: process.env.API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1'
    }
  },
  
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});