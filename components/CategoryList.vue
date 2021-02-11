<template>
  <div class="flex">
    <div v-for="category in categories" :key="category.id">
      <div class="mx-4 px-2">
        <nuxt-link
          :to="`/category/${category.slug}`"
          class="underline p-4 text-red-500"
        >
          <h4 class="font-normal leading-tight text-red-500">
            {{ category.name }}
          </h4>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    categories: {
      type: Array,
      default: null,
    },
  },
})
</script>
