import axios from 'axios'
const dynamicRoutes = async () => {
  const posts = await axios
    .get(
      'https://blog.carnetsvanille.com/wp-json/wp/v2/posts?page=1&per_page=99'
    )
    .then((res) => {
      return res.data.map((post) => `/${post.slug}`)
    })

  const categories = await axios
    .get('https://blog.carnetsvanille.com/wp-json/wp/v2/categories')
    .then((res) => {
      return res.data.map((category) => `/category/${category.slug}`)
    })

  const routes = posts.concat(categories)

  console.log(routes)

  return routes
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'carnets-vanille-headless',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/data.server.js', 'plugins/preview.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-graphql-request',
    'nuxt-compress',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],
  graphql: {
    /**
     * Your GraphQL endpoint
     */
    endpoint: 'https://blog.carnetsvanille.com/graphql',

    /**
     * Options
     * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
     */
    options: {},

    /**
     * Optional
     * default: true (this includes cross-fetch/polyfill before creating the graphql client)
     */
    useFetchPolyfill: true,

    /**
     * Optional
     * default: false (this includes graphql-tag for node_modules folder)
     */
    includeNodeModules: true,
  },
  axios: {
    baseURL:
      process.env.VERCEL_ENV !== 'production'
        ? 'https://carnets-vanille-headless.vercel.app/'
        : 'http://localhost:3000/',
  },
  'nuxt-compress': {
    gzip: {
      cache: true,
    },
    brotli: {
      threshold: 10240,
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: true,
  },
  generate: {
    concurrency: 20,
    // routes: dynamicRoutes,
  },
}
