export default {
  head: {
    title: 'boroberim',
    htmlAttrs: {
      lang: 'fa',
      dir: 'rtl'
    },
    meta: [
      { 'http-equiv': 'content-type', content: 'text/html;charset=UTF-8' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [
    '@/assets/css/index.css',
    '@/static/fonts/boroberim/style.css',
    '@/static/fonts/shabnam/css/style.css',
    '@/static/fonts/boxicons-2.0.7/css/boxicons.min.css',
    '@/static/plugins/uikit-3.6.22/css/uikit-rtl.min.css',
    '@/assets/styles/css/public.css'
  ],

  plugins: [
    '~/plugins/notification.js',
    '~/plugins/starrating.client.js',
	'@/plugins/axios',
    { src: "~/plugins/datePicker", mode: "client" }
  ],

  components: false,

  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    'nuxt-vuikit',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'cookie-universal-nuxt',
    'nuxt-vue-select',
    'nuxt-leaflet'
  ],
  vuikit: {
    defaultTheme: true,
    icons: true
  },
  axios: {
    baseURL: 'https://api.boroberim.net'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'api/v1/signIn', method: 'post', propertyName: 'token' },
          logout: { url: 'api/v1/signOut', method: 'get' },
          user: { url: 'api/v1/user', method: 'get', propertyName: 'user' }
        },
      },
    },
    redirect: {
      login: false,
      logout: false,
      callback: false,
      home: false
    }
  },

  server: {
    port: 3000
  }
}
