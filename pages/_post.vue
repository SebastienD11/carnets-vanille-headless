<template>
  <div v-if="post" class="max-w-screen-lg mx-auto p-10">
    {{ post.title }}
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
  computed: {
    ...mapState(['posts']),
    post() {
      return this.posts.find((el) => el.slug === this.slug)
    },
  },
})
</script>
