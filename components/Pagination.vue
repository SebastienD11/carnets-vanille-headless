<template>
  <div class="flex justify-between">
    <nuxt-link
      v-if="hasPreviousPage"
      :to="previousPageLink"
      class="underline text-red-500"
    >
      Recent
    </nuxt-link>
    <span v-if="!hasPreviousPage" class="text-gray-500">Recent</span>
    <nuxt-link
      v-if="hasNextPage"
      :to="nextPageLink"
      class="underline text-red-500"
    >
      Older
    </nuxt-link>
    <span v-if="!hasNextPage" class="text-gray-500">Older</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    hasPreviousPage: {
      type: Boolean,
      default: false,
    },
    previousPageLink: {
      type: String,
      default: null,
    },
    hasNextPage: {
      type: Boolean,
      default: false,
    },
    nextPageLink: {
      type: String,
      default: null,
    },
  },
})
</script>
