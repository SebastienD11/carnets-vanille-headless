<template>
  <div>
    <PostsList :posts="postsList" />
    <Pagination :has-next-page="hasNextPage" :next-page-link="nextPageLink" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  head() {
    return {
      htmlAttrs: {
        lang: this.settings.generalSettingsLanguage,
      },
      title: this.settings.generalSettingsTitle,
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  computed: {
    ...mapState(['posts', 'settings']),
    postsList() {
      return this.postPerPage(this.posts)
    },
    hasNextPage() {
      if (this.settings.readingSettingsPostsPerPage < this.posts.length) {
        return true
      }
      return false
    },
    nextPageLink() {
      if (!this.hasNextPage) {
        return ''
      }
      return '/2'
    },
  },
  methods: {
    postPerPage(posts) {
      return posts.slice(0, this.settings.readingSettingsPostsPerPage)
    },
  },
})
</script>
