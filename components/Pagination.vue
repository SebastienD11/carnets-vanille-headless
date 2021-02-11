<template>
  <div class="flex justify-between">
    <nuxt-link
      :disabled="!hasPreviousPage"
      :to="`${slug}/${currentPage - 1}`"
      :class="{
        'pointer-events-none text-gray-500': !hasPreviousPage,
        'underline text-red-500': hasPreviousPage,
      }"
    >
      Recent
    </nuxt-link>
    <div>
      {{ totalPosts }}
    </div>
    <nuxt-link
      :disabled="!hasNextPage"
      :to="`${slug}/${currentPage + 1}`"
      :class="{
        'pointer-events-none text-gray-500': !hasNextPage,
        'underline text-red-500': hasNextPage,
      }"
    >
      Older
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    slug: {
      type: String,
      default: null,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    postsPerPage: {
      type: Number,
      default: null,
    },
    totalPosts: {
      type: Number,
      default: null,
    },
  },
  computed: {
    hasPreviousPage() {
      if (this.currentPage * this.postsPerPage > this.postsPerPage) {
        return true
      }
      return false
    },
    hasNextPage() {
      if (this.currentPage * this.postsPerPage < this.totalPosts) {
        return true
      }
      return false
    },
  },
})
</script>
