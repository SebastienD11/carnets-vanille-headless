import gql from 'graphql-tag'

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
  async getPosts({ commit }) {
    // if posts is already set, stop
    // if (state.posts.length) return
    try {
      const posts = await this.app.apolloProvider.defaultClient.query({
        // prefetch: true,
        query: GET_POSTS,
      })
      commit('SET_POSTS', posts.data.posts.nodes)
    } catch (err) {
      console.error('getPosts:::', err)
    }
  },
  async getCategories({ commit }) {
    // if categories is already set, stop
    // if (state.categories.length) return
    try {
      const categories = await this.app.apolloProvider.defaultClient.query({
        // prefetch: true,
        query: GET_CATEGORIES,
      })
      commit('SET_CATEGORIES', categories.data.categories.nodes)
    } catch (err) {
      console.error('getCategories', err)
    }
  },
}
