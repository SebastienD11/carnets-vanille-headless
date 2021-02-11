<template>
  <div v-if="category">
    <h1 class="text-2xl text-center mb-12">{{ category.name }}</h1>
    <PostsList :posts="postsList" />
    <Pagination
      :current-page="1"
      :slug="'/category/' + slug"
      :total-posts="totalPostForCategory"
      :posts-per-page="settings.readingSettingsPostsPerPage"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      slug: this.$route.params.slug,
      totalPostForCategory: null,
    }
  },
  computed: {
    ...mapState(['categories', 'posts', 'settings']),
    category() {
      return this.categories.find((el) => el.slug === this.slug)
    },
    postsList() {
      return this.postPerPage(this.postForCategory())
    },
  },
  methods: {
    postForCategory() {
      const posts = this.posts.filter((el) => {
        const categories = []
        el.categories.nodes.forEach((category) => {
          categories.push(category.categoryId)
        })
        return categories.includes(this.category.categoryId)
      })
      this.totalPostForCategory = posts.length
      return posts
    },
    postPerPage(posts) {
      return posts.slice(0, this.settings.readingSettingsPostsPerPage)
    },
  },
})
</script>