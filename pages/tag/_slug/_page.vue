<template>
  <div v-if="tag">
    <h1 class="lg:text-5xl mb-12 text-xl font-bold leading-tight text-center">
      {{ tag.name }} (page: {{ page }})
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
      totalPostForTag: null,
    }
  },
  head() {
    return {
      title:
        this.tag.seo.title ||
        this.tag.title + ' | ' + this.settings.generalSettingsTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.tag.seo.metaDesc,
        },
      ],
      link: [
        { rel: 'canonical', href: this.$route.path },
        { rel: 'prev', href: this.previousPageLink },
        { rel: 'next', href: this.nextPageLink },
      ],
    }
  },
  computed: {
    ...mapState(['settings', 'tags', 'posts']),
    tag() {
      return this.tags.find((el) => el.slug === this.slug)
    },
    postsList() {
      return this.postPerPage(this.postForTag())
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
        this.totalPostForTag
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
        return '/tag/' + this.slug
      } else {
        return '/tag/' + this.slug + '/' + (Number.parseInt(this.page) - 1)
      }
    },
    nextPageLink() {
      if (!this.hasNextPage) {
        return ''
      }
      return '/tag/' + this.slug + '/' + (Number.parseInt(this.page) + 1)
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
      return posts.slice(
        this.settings.readingSettingsPostsPerPage * (this.page - 1),
        this.settings.readingSettingsPostsPerPage * (this.page - 1) +
          this.settings.readingSettingsPostsPerPage
      )
    },
  },
})
</script>
