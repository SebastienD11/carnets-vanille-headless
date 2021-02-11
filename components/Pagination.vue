<template>
  <div class="flex justify-between">
    <nuxt-link
      v-if="hasPreviousPage"
      :to="`${slug}/${currentPage - 1}`"
      :class="{
        'underline text-red-500': hasPreviousPage,
      }"
    >
      Recent
    </nuxt-link>
    <span v-if="!hasPreviousPage" class="text-gray-500"> Recent </span>
    <div>
      {{ totalPosts }}
    </div>
    <nuxt-link
      v-if="hasNextPage"
      :to="`${slug}/${currentPage + 1}`"
      :class="{
        'underline text-red-500': hasNextPage,
      }"
    >
      Older
    </nuxt-link>
    <span v-if="!hasNextPage" class="text-gray-500"> Older </span>
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
