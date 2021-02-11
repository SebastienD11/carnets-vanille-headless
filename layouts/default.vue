<template>
  <div class="max-w-screen-lg mx-auto p-10">
    <nuxt-link :to="`/`"><Logo /></nuxt-link>
    <h1 class="text-2xl text-center my-12">Try GraphQL Request - With Store</h1>
    <CategoryList :categories="categories" />
    <hr class="my-12" />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['categories']),
  },
})
</script>
