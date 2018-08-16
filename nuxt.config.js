// Use .env in nuxt config only (keep secrets on the dl)
// -- https://github.com/nuxt/nuxt.js/issues/2033#issuecomment-398820574
// -- https://github.com/nuxt-community/dotenv-module#using-env-file-in-nuxtconfigjs
require('dotenv').config()

// Body parser middleware needed to inject required fields for LibCal API auth
const bodyParser = require('body-parser')

const libcalApi = 'https://api2.libcal.com'
const libcalApiPath = '/api/libcal/'
const libcalHoursApi = 'https://api3.libcal.com'
const libcalHoursApiPath = '/api/libcal-hours/'

module.exports = {
  modules: [
    '@nuxtjs/axios'
  ],
  serverMiddleware: [
    // Parse request body so it can be manipulated by proxy middleware
    // -- https://nuxtjs.org/api/configuration-servermiddleware
    { path: libcalApiPath, handler: bodyParser.json() }
  ],
  axios: {
    prefix: '/api/',
    proxy: true
  },
  proxy: {
    [libcalApiPath]: {
      target: libcalApi,
      pathRewrite: { [`^${libcalApiPath}`]: '' },
      onProxyReq: (proxyReq, req, res) => {
        if (req.method === 'POST' && req.body) {
          // Build object for POST request to obtain access token
          let body = {
            client_id: process.env.LIBCAL_CLIENT_ID,
            client_secret: process.env.LIBCAL_CLIENT_SECRET,
            grant_type: 'client_credentials'
          }

          body = JSON.stringify(body)

          // Update headers
          proxyReq.setHeader('Content-Type', 'application/json')
          proxyReq.setHeader('Content-Length', Buffer.byteLength(body))

          // Write new body to the proxyReq stream
          proxyReq.write(body)
        }
      }
    },
    [libcalHoursApiPath]: {
      target: libcalHoursApi,
      pathRewrite: { [`^${libcalHoursApiPath}`]: '' }
    }
  },
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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700' }
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
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
