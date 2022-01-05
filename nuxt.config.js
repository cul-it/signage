// Use .env in nuxt config only (keep secrets on the dl)
// -- https://github.com/nuxt/nuxt.js/issues/2033#issuecomment-398820574
// -- https://github.com/nuxt-community/dotenv-module#using-env-file-in-nuxtconfigjs
import 'dotenv/config'

// Body parser middleware needed to inject required fields for LibCal API auth
import bodyParser from 'body-parser'

const labstatsApi = 'https://online.labstats.com'
const labstatsApiPath = '/api/labstats/'
const libcalApi = 'https://api2.libcal.com'
const libcalApiPath = '/api/libcal/'
const libcalHoursApi = 'https://api3.libcal.com'
const libcalHoursApiPath = '/api/libcal-hours/'
const okapiApi = 'https://okapi-cornell.folio.ebsco.com'
const okapiApiPath = '/api/okapi/'
const r25Api = 'https://r25.registrar.cornell.edu/r25ws/servlet/wrd/run'
const r25ApiPath = '/api/r25/'

var restreamClientCreds = (proxyReq, req, res) => {
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

var restreamClientCredsOkapi = (proxyReq, req, res) => {
  if (req.method === 'POST' && req.body) {
    // Build object for POST request to obtain auth token
    let body = {
      username: process.env.OKAPI_USER,
      password: process.env.OKAPI_PASSWORD
    }

    body = JSON.stringify(body)

    // Update headers
    proxyReq.setHeader('Content-Type', 'application/json')
    proxyReq.setHeader('Content-Length', Buffer.byteLength(body))
    proxyReq.setHeader('X-Okapi-Tenant', process.env.OKAPI_TENANT)

    // Write new body to the proxyReq stream
    proxyReq.write(body)
  }
}

module.exports = {
  modules: [
    '@nuxtjs/axios'
  ],
  serverMiddleware: [
    // Parse request body so it can be manipulated by proxy middleware
    // -- https://nuxtjs.org/api/configuration-servermiddleware
    { path: libcalApiPath, handler: bodyParser.json() },
    { path: okapiApiPath, handler: bodyParser.json() }
  ],
  axios: {
    prefix: '/api/',
    proxy: true
  },
  proxy: {
    [labstatsApiPath]: {
      target: labstatsApi,
      pathRewrite: { [`^${labstatsApiPath}`]: '' },
      onProxyReq: (proxyReq, req, res) => {
        // Auth header
        proxyReq.setHeader('Authorization', process.env.LABSTATS_AUTH)
      }
    },
    [libcalApiPath]: {
      target: libcalApi,
      pathRewrite: { [`^${libcalApiPath}`]: '' },
      onProxyReq: restreamClientCreds
    },
    [libcalHoursApiPath]: {
      target: libcalHoursApi,
      pathRewrite: { [`^${libcalHoursApiPath}`]: '' }
    },
    [okapiApiPath]: {
      target: okapiApi,
      pathRewrite: { [`^${okapiApiPath}`]: '' },
      onProxyReq: restreamClientCredsOkapi
    },
    [r25ApiPath]: {
      target: r25Api,
      pathRewrite: { [`^${r25ApiPath}`]: '' },
      onProxyReq: (proxyReq, req, res) => {
        // Auth header
        proxyReq.setHeader('Authorization', process.env.R25_AUTH)
      }
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'CUL Signage',
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
    loaders: {
      vue: {
        compilerOptions: {
          whitespace: 'condense'
        }
      }
    },
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
        }, {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        })
      }
    }
  }
}
