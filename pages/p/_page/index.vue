<template>
  <div v-if="page">
    <h1 class="mb-12 text-2xl text-center">
      {{ page.title }}
    </h1>
    <div class="lg:prose-xl mb-4 prose" v-html="page.content"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      slug: this.$route.params.page,
    }
  },
  head() {
    return {
      title:
        this.page.seo.title ||
        this.page.title + ' | ' + this.settings.generalSettingsTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.seo.metaDesc,
        },
      ],
      link: [{ rel: 'canonical', href: this.$route.path }],
    }
  },
  computed: {
    ...mapState(['pages', 'settings']),
    page() {
      return this.pages.find((el) => el.slug === this.slug)
    },
  },
})
</script>
