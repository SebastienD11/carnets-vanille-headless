import { gql } from 'nuxt-graphql-request'

export const state = () => ({
  pages: [],
  posts: [],
  categories: [],
  menus: { 'main-menu': [], 'footer-menu': [] },
  settings: [],
})

export const getters = {}

export const mutations = {
  SET_PAGES: (state, pages) => {
    state.pages = pages
  },
  SET_MAIN_MENU: (state, menu) => {
    state.menus['main-menu'] = menu
  },
  SET_FOOTER_MENU: (state, menu) => {
    state.menus['footer-menu'] = menu
  },
  SET_POSTS: (state, posts) => {
    state.posts = posts
    state.settings.totalCountPost = posts.length
  },
  SET_CATEGORIES: (state, categories) => {
    state.categories = categories
  },
  SET_SETTINGS: (state, settings) => {
    state.settings = settings
  },
}

const GET_MAIN_MENU = gql`
  query getMainMenu {
    menus(where: { location: MAIN_MENU }) {
      nodes {
        locations
        menuItems {
          nodes {
            connectedNode {
              node {
                ... on Page {
                  title
                  uri
                  slug
                }
                ... on Category {
                  name
                  uri
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`

const GET_FOOTER_MENU = gql`
  query getFooterMenu {
    menus(where: { location: FOOTER_MENU }) {
      nodes {
        locations
        menuItems {
          nodes {
            connectedNode {
              node {
                ... on Page {
                  title
                  uri
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`

const GET_SETTINGS = gql`
  query getSettings {
    allSettings {
      generalSettingsTitle
      readingSettingsPostsPerPage
      generalSettingsLanguage
    }
  }
`

const GET_PAGES = gql`
  query getPages {
    pages(first: 200) {
      nodes {
        id
        slug
        title
        content
        seo {
          canonical
          cornerstone
          focuskw
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          opengraphDescription
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
          title
          twitterDescription
          twitterTitle
        }
      }
    }
  }
`

const GET_POSTS = gql`
  query getPosts {
    posts(first: 200) {
      nodes {
        id
        slug
        title
        content
        categories {
          nodes {
            categoryId
          }
        }
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
          }
        }
        seo {
          canonical
          cornerstone
          focuskw
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          opengraphDescription
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
          title
          twitterDescription
          twitterTitle
        }
      }
    }
  }
`
const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      nodes {
        name
        count
        description
        categoryId
        slug
        seo {
          canonical
          cornerstone
          focuskw
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          opengraphDescription
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
          title
          twitterDescription
          twitterTitle
        }
      }
    }
  }
`

export const actions = {
  async getSettings({ commit }) {
    try {
      const query = await this.$graphql.request(GET_SETTINGS)
      commit('SET_SETTINGS', query.allSettings)
    } catch (err) {
      console.error('getSettings:::', err)
    }
  },
  async getMainMenu({ commit }) {
    try {
      const query = await this.$graphql.request(GET_MAIN_MENU)
      commit('SET_MAIN_MENU', query.menus.nodes)
    } catch (err) {
      console.error('getMainMenu:::', err)
    }
  },
  async getFooterMenu({ commit }) {
    try {
      const query = await this.$graphql.request(GET_FOOTER_MENU)
      commit('SET_FOOTER_MENU', query.menus.nodes)
    } catch (err) {
      console.error('getFooterMenu:::', err)
    }
  },

  async getPages({ commit, state }) {
    // if posts is already set, stop
    if (state.pages.length) return
    try {
      const query = await this.$graphql.request(GET_PAGES)
      commit('SET_PAGES', query.pages.nodes)
    } catch (err) {
      console.error('getPages:::', err)
    }
  },
  async getPosts({ commit, state }) {
    // if posts is already set, stop
    if (state.posts.length) return
    try {
      const query = await this.$graphql.request(GET_POSTS)
      commit('SET_POSTS', query.posts.nodes)
    } catch (err) {
      console.error('getPosts:::', err)
    }
  },
  async getCategories({ commit, state }) {
    // if categories is already set, stop
    if (state.categories.length) return
    try {
      const query = await this.$graphql.request(GET_CATEGORIES)
      commit('SET_CATEGORIES', query.categories.nodes)
    } catch (err) {
      console.error('getCategories:::', err)
    }
  },
}
