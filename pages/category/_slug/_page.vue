<template>
  <div v-if="category">
    <h1 class="text-2xl text-center mb-12">
      {{ category.name }} (page: {{ page }})
    </h1>
    <PostsList :posts="postsList" />
    <Pagination
      :has-previous-page="hasPreviousPage"
      :previous-page-link="previousPageLink"
      :has-next-page="hasNextPage"
      :next-page-link="nextPageLink"
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
      page: this.$route.params.page,
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
        { rel: 'prev', href: this.previousPageLink },
        { rel: 'next', href: this.nextPageLink },
      ],
    }
  },
  computed: {
    ...mapState(['settings', 'categories', 'posts']),
    category() {
      return this.categories.find((el) => el.slug === this.slug)
    },
    postsList() {
      return this.postPerPage(this.postForCategory())
    },
    hasPreviousPage() {
      if (this.page > 1) {
        return true
      }
      return false
    },
    hasNextPage() {
      if (
        Number.parseInt(this.page) * this.settings.readingSettingsPostsPerPage <
        this.totalPostForCategory
      ) {
        return true
      }
      return false
    },
    previousPageLink() {
      if (!this.hasPreviousPage) {
        return ''
      }
      if (this.page === '2') {
        return '/category/' + this.slug
      } else {
        return '/category/' + this.slug + '/' + (Number.parseInt(this.page) - 1)
      }
    },
    nextPageLink() {
      if (!this.hasNextPage) {
        return ''
      }
      return '/category/' + this.slug + '/' + (Number.parseInt(this.page) + 1)
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
      return posts.slice(
        this.settings.readingSettingsPostsPerPage * (this.page - 1),
        this.settings.readingSettingsPostsPerPage * (this.page - 1) +
          this.settings.readingSettingsPostsPerPage
      )
    },
  },
})
</script>
