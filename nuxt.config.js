const webpack = require("webpack");
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-proj',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css'},
    ],
    script: [
      {src: 'js/d3.js'},
      {src: 'js/d3-selection.js'},
      {src: 'js/jquery112.js'},
      {src: 'js/turntable.js'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: 'components/loading.vue',
  /*
  ** Build configuration
  */
  css: [
    '@/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '~assets/scss/main.scss'
  ],
  styleResources: {
    scss: ['~assets/scss/main.scss']
  }
  ,
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'https://sweews.herokuapp.com/api/',
    proxyHeaders: false,
    credentials: false
  },
  plugins: [
    {src: '~plugins/pano.js', mode: 'client'}
    // {src: '~plugins/localize.filter.js', mode: 'client'}
  ],
  build: {


    vendor: ["jquery", "/js/turntable.js"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery"
      })],

    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  mode: 'spa'
}

