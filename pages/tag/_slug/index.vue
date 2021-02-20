<template>
  <div v-if="tag">
    <h1 class="mb-12 text-2xl text-center">{{ tag.name }}</h1>
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
      totalPostForTag: null,
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.settings.generalSettingsLanguage,
      },
      title:
        this.tag.seo.title ||
        this.tag.title + ' | ' + this.settings.generalSettingsTitle,
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: this.tag.seo.metaDesc,
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
    ...mapState(['tags', 'posts', 'settings']),
    tag() {
      return this.tags.find((el) => el.slug === this.slug)
    },
    postsList() {
      return this.postPerPage(this.postForTag())
    },
    hasNextPage() {
      if (this.settings.readingSettingsPostsPerPage < this.totalPostForTag) {
        return true
      }
      return false
    },
    nextPageLink() {
      if (!this.hasNextPage) {
        return ''
      }
      return '/tag/' + this.slug + '/2'
    },
  },
  methods: {
    postForTag() {
      const posts = this.posts.filter((el) => {
        const tags = []
        el.tags.nodes.forEach((tag) => {
          tags.push(tag.tagId)
        })
        return tags.includes(this.tag.tagId)
      })
      this.totalPostForTag = posts.length
      return posts
    },
    postPerPage(posts) {
      return posts.slice(0, this.settings.readingSettingsPostsPerPage)
    },
  },
})
</script>
