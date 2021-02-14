// import { gql } from 'nuxt-graphql-request'
import getPosts from '../queries/posts.gql'
import getCategories from '../queries/categories.gql'
import getPages from '../queries/pages.gql'
import getMenus from '../queries/menus.gql'
import getSettings from '../queries/settings.gql'

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

export const actions = {
  async getSettings({ commit }) {
    try {
      const query = await this.$graphql.request(getSettings)
      commit('SET_SETTINGS', query.allSettings)
    } catch (err) {
      console.error('getSettings:::', err)
    }
  },
  async getMainMenu({ commit }) {
    try {
      const query = await this.$graphql.request(getMenus)
      commit('SET_MAIN_MENU', query.mainMenu.nodes)
    } catch (err) {
      console.error('getMainMenu:::', err)
    }
  },
  async getFooterMenu({ commit }) {
    try {
      const query = await this.$graphql.request(getMenus)
      commit('SET_FOOTER_MENU', query.footerMenu.nodes)
    } catch (err) {
      console.error('getFooterMenu:::', err)
    }
  },

  async getPages({ commit, state }) {
    // if posts is already set, stop
    if (state.pages.length) return
    try {
      const query = await this.$graphql.request(getPages)
      commit('SET_PAGES', query.pages.nodes)
    } catch (err) {
      console.error('getPages:::', err)
    }
  },
  async getPosts({ commit, state }) {
    // if posts is already set, stop
    if (state.posts.length) return
    try {
      const query = await this.$graphql.request(getPosts)
      commit('SET_POSTS', query.posts.nodes)
    } catch (err) {
      console.error('getPosts:::', err)
    }
  },
  async getCategories({ commit, state }) {
    // if categories is already set, stop
    if (state.categories.length) return
    try {
      const query = await this.$graphql.request(getCategories)
      commit('SET_CATEGORIES', query.categories.nodes)
    } catch (err) {
      console.error('getCategories:::', err)
    }
  },
}
