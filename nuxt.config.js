const cfg = require('config');

module.exports = {
  srcDir: cfg.get('paths.app.client'),
  buildDir: cfg.get('paths.dist.client'),
  rootDir: './',
  head: {
    title: 'Mavel 1.0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/css/main.css'
  ],
  loading: { color: '#3B8070' },
  build: {
    vendor: [],
    extractCSS: {
      allChunks: true
    }
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/workbox',
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: cfg.get('baseUrl')
  },
  manifest: {
    name: 'Mavel',
    description: 'SSR based boilerplate',
    theme_color: '#000'
  },
  plugins: []
};
