<template>
  <div class="max-w-prose">
    <nuxt-link
      v-for="post in posts"
      :key="post.id"
      :to="`/article/${post.slug}`"
      class="hover:bg-gray-100 flex items-center p-12 mb-12"
    >
      <img
        v-if="featuredImage(post)"
        width="100"
        :src="featuredImage(post)"
        class="mr-12 bg-gray-100 border-none rounded"
      />
      <div class="flex flex-col justify-between">
        <div>
          <div v-if="post.tags" class="mb-4">
            <nuxt-link
              v-for="tag in post.tags.nodes"
              :key="tag.tagId"
              :to="`/tag/${tag.slug}`"
              class="px-2 py-1 mr-2 text-xs text-white bg-gray-400 rounded-full"
            >
              {{ tag.name }}
            </nuxt-link>
          </div>
          <h4 class="lg:text-5xl mb-4 text-xl font-bold leading-tight">
            {{ post.title }}
          </h4>
        </div>
      </div>
    </nuxt-link>
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
