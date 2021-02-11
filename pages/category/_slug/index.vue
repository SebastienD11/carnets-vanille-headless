<template>
  <div v-if="category">
    <h1 class="text-2xl text-center mb-12">{{ category.name }}</h1>
    <PostsList :posts="postsList" />
    <nuxt-link :to="`/category/${slug}/2`" class="underline p-4 text-red-500">
      page 2
    </nuxt-link>
    <nuxt-link :to="`/category/${slug}/3`" class="underline p-4 text-red-500">
      page 3
    </nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      slug: this.$route.params.slug,
    }
  },
  computed: {
    ...mapState(['categories', 'posts', 'settings']),
    category() {
      return this.categories.find((el) => el.slug === this.slug)
    },
    postsList() {
      const posts = this.posts.filter((el) => {
        const categories = []
        el.categories.nodes.forEach((category) => {
          categories.push(category.categoryId)
        })
        return categories.includes(this.category.categoryId)
      })
      return this.postPerPage(posts)
    },
  },
  methods: {
    postPerPage(posts) {
      return posts.slice(0, this.settings.readingSettingsPostsPerPage)
    },
  },
})
</script>
