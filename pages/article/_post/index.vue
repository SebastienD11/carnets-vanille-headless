<template>
  <div v-if="post">
    <h1 class="lg:text-5xl mb-12 text-xl font-bold leading-tight text-center">
      {{ post.title }}
    </h1>
    <div class="lg:prose-xl mb-4 prose" v-html="post.content"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      slug: this.$route.params.post,
    }
  },
  head() {
    return {
      title:
        this.post.seo.title ||
        this.post.title + ' | ' + this.head.generalSettingsTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.seo.metaDesc,
        },
      ],
      link: [{ rel: 'canonical', href: this.$route.path }],
    }
  },
  computed: {
    ...mapState(['posts', 'settings']),
    post() {
      return this.posts.find((el) => el.slug === this.slug)
    },
  },
})
</script>
