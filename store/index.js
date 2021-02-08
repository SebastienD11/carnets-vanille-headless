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

export const actions = {
  async getPosts({ state, commit }) {
    // if posts is already set, stop
    // if (state.posts.length) return
    try {
      const posts = await this.$axios.$get(
        `https://blog.carnetsvanille.com//wp-json/wp/v2/posts?page=1&per_page=99`
      )
      // filter out unnecessary data
      // posts = posts.map(({ id, slug, title, content, categories }) => ({
      //   id,
      //   slug,
      //   title,
      //   content,
      //   categories,
      // }))
      commit('SET_POSTS', posts)
    } catch (err) {
      console.error('getPosts', err)
    }
  },
  async getCategories({ state, commit }) {
    // if categories is already set, stop
    if (state.categories.length) return
    try {
      const categories = await this.$axios.$get(
        `https://blog.carnetsvanille.com/wp-json/wp/v2/categories`
      )
      // filter out unnecessary data
      // categories = categories.map(({ id, slug, title, content }) => ({
      //   id,
      //   slug,
      //   title,
      //   content,
      // }))
      commit('SET_CATEGORIES', categories)
    } catch (err) {
      console.error('getCategories', err)
    }
  },
}
