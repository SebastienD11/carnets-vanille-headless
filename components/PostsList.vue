<template>
  <div>
    <div v-for="(post, index) in posts" :key="post.id" class="mb-6">
      <div :key="index" class="">
        <div class="flex">
          <img
            v-if="featuredImage(post)"
            :src="featuredImage(post)"
            width="100"
            class="mr-4"
          />
          <div>
            <nuxt-link
              v-for="tag in post.tags.nodes"
              :key="tag.tagId"
              :to="`/tag/${tag.slug}`"
              class="px-2 py-1 mr-2 text-xs text-white bg-gray-400 rounded-full"
            >
              {{ tag.name }}
            </nuxt-link>
            <h4 class="lg:text-3xl text-xl font-normal leading-tight">
              {{ post.title }}
            </h4>
            <nuxt-link :to="`/${post.slug}`" class="text-red-500 underline">
              post Info
            </nuxt-link>
          </div>
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
  methods: {
    featuredImage(post: any) {
      if (post.featuredImage) {
        return post.featuredImage.node.sourceUrl
      }
      return false
    },
  },
})
</script>
