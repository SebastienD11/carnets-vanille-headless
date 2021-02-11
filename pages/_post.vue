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
  computed: {
    ...mapState(['posts']),
    post() {
      return this.posts.find((el) => el.slug === this.slug)
    },
  },
})
</script>
