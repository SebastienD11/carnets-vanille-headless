import { gql } from 'nuxt-graphql-request'

export const state = () => ({
  posts: [],
  categories: [],
})

export const getters = {}

export const mutations = {
  SET_POSTS: (state, posts) => {
    state.posts = posts
  },
  SET_CATEGORIES: (state, categories) => {
    state.categories = categories
  },
}

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
      }
    }
  }
`

export const actions = {
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
      console.error('getCategories', err)
    }
  },
}
