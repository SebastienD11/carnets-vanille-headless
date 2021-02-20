<template>
  <div v-if="category">
    <h1 class="lg:text-5xl mb-12 text-xl font-bold leading-tight text-center">
      {{ category.name }}
    </h1>
    <PostsList :posts="postsList" />
    <Pagination :has-next-page="hasNextPage" :next-page-link="nextPageLink" />
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
  head() {
    return {
      htmlAttrs: {
        lang: this.settings.generalSettingsLanguage,
      },
      title:
        this.category.seo.title ||
        this.category.title + ' | ' + this.settings.generalSettingsTitle,
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: this.category.seo.metaDesc,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: this.$route.path },
        { rel: 'next', href: this.nextPageLink },
      ],
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
    hasNextPage() {
      if (
        this.settings.readingSettingsPostsPerPage < this.totalPostForCategory
      ) {
        return true
      }
      return false
    },
    nextPageLink() {
      if (!this.hasNextPage) {
        return ''
      }
      return '/category/' + this.slug + '/2'
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
