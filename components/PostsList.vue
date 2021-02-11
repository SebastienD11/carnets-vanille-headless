<template>
  <div>
    <div v-for="(post, index) in posts" :key="post.id" class="mb-4">
      <div :key="index" class="">
        <div class="">
          <h4 class="text-xl lg:text-3xl font-normal leading-tight">
            {{ post.title }}
          </h4>
          <nuxt-link :to="`/${post.slug}`" class="underline text-red-500">
            post Info
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    posts: {
      type: Array,
      default: null,
    },
  },
})
</script>
