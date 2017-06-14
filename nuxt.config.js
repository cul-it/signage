const NuxtHelpers = require('nuxt-helpers')

module.exports = NuxtHelpers([
  'axios'
], {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:200,400' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Droid+Sans:400,700' },
      { rel: 'javascript', href: 'https://use.fontawesome.com/393a6fea12.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'rgba(33,43,57,.3)' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['lodash']
  }
})
