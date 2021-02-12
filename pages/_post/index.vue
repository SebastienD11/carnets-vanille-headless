<template>
  <div v-if="post">
    <h1 class="text-2xl text-center mb-12">
      {{ post.title }}
    </h1>
    <div class="mb-4" v-html="post.content"></div>
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
      htmlAttrs: {
        lang: this.settings.generalSettingsLanguage,
      },
      title:
        this.post.seo.title ||
        this.post.title + ' | ' + this.settings.generalSettingsTitle,
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: this.post.seo.metaDesc,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: this.$route.path },
      ],
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
