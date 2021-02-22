<template>
  <div>
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
      page: this.$route.params.page,
    }
  },
  head() {
    /* For the home page, the meta title and meta description are setup inside the nuxt.config.js */
    return {
      link: [
        { rel: 'canonical', href: this.$route.path },
        { rel: 'prev', href: this.previousPageLink },
        { rel: 'next', href: this.nextPageLink },
      ],
    }
  },
  computed: {
    ...mapState(['posts', 'settings']),
    postsList() {
      return this.postPerPage(this.posts)
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
        this.posts.length
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
        return '/'
      } else {
        return '/' + (Number.parseInt(this.page) - 1)
      }
    },
    nextPageLink() {
      if (!this.hasNextPage) {
        return ''
      }
      return '/' + (Number.parseInt(this.page) + 1)
    },
  },
  methods: {
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
