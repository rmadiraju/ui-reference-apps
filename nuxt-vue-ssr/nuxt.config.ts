// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3001/api',
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [],
  app: {
    head: {
      title: 'UI Reference Apps - Nuxt.js + Vue SSR',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt.js + Vue Server-Side Rendering Reference Application' }
      ]
    }
  }
}) 