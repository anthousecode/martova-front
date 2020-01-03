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
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
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
  ],
  build: {
    /*
    ** Run ESLint on save
    */
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

