<template>
  <div class="max-w-screen-lg mx-auto p-10">
    <div v-for="(post, index) in posts" :key="post.id">
      <div :key="index" class="lg:flex lg:max-w-screen-lg pb-8 lg:pb-16">
        <div class="lg:w-1/4"></div>
        <div class="lg:w-3/4 lg:pl-8">
          <h4 class="text-xl lg:text-3xl font-normal leading-tight">
            {{ post.title.rendered }}
          </h4>
          <p class="mb-4" v-html="post.content.rendered"></p>
          <nuxt-link
            :to="`/${post.slug}`"
            class="btn-sm lg:btn btn-green mb-2 mr-2"
          >
            post Info
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['posts']),
  },
  created() {
    this.getPosts()
  },
  methods: {
    ...mapActions(['getPosts']),
  },
})
</script>
