<template>
  <div v-if="post" class="max-w-screen-lg mx-auto p-10">
    TEMPLATE POST _SLUG
    {{ post.title.rendered }}
    <div class="mb-4" v-html="post.content.rendered"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

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
  created() {
    this.getPosts()
  },
  methods: {
    ...mapActions(['getPosts']),
  },
})
</script>
