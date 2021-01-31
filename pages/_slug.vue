<template>
  <div class="max-w-screen-lg mx-auto p-10">
    {{ post.title.rendered }}
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      slug: this.$route.params.slug,
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
