const axios = require('axios')
const pkg = require('./package')
module.exports = {
  mode: 'spa',
  server: {
    // host: '0.0.0.0',
    host: 'localhost',
    port: 3079 // default: 3000
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      // {
      //   src: 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js'
      // }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', 'assets/main.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/i18n', '@/plugins/element-ui', '@/plugins/axios'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // 'cookie-universal-nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/perfume': {
      target: 'http://127.0.0.1:3001'
      // changeOrigin: true,
      // pathRewrite: {
      //   '^/shop': ''
      // }
    }
  },
  // buildDir: 'perfume',
  buildModules: ['@nuxtjs/tailwindcss'],
  router: {
    base: '/perfume/',
    middleware: ['auth']
  },
  tailwindcss: {
    configPath: '~/config/tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css'
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // credentials: true
    // See https://github.com/nuxt-community/axios-module#options
  },
  render: {
    resourceHints: false
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    extractCSS: { allChunks: true },
    publicPath: 'http://localhost:3001/perfume',
    /*
     ** You can extend webpack config her
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
      const lessResourcesLoader = {
        loader: 'less-loader'
        // options: {
        //   resources: ['assets/style/theme.less', 'assets/style/mixins.less']
        // }
      }
      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.vue$/') {
          rule.options.loaders.less.push(lessResourcesLoader)
        }
        if (rule.test.toString() === '/\\.less$/') {
          rule.use.push(lessResourcesLoader)
        }
      })
    }
  }
}
