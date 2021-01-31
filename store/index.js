export const state = () => ({
  posts: [],
})

export const getters = {}

export const mutations = {
  SET_POSTS: (state, posts) => {
    state.posts = posts
  },
}

export const actions = {
  async getPosts({ state, commit }) {
    // if posts is already set, stop
    if (state.posts.length) return
    try {
      let posts = await this.$axios.$get(
        `https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=4&_embed=1`
      )
      // filter out unnecessary data
      posts = posts.map(({ id, slug, title, content }) => ({
        id,
        slug,
        title,
        content,
      }))
      commit('SET_POSTS', posts)
    } catch (err) {
      console.error('getPosts', err)
    }
  },
}
