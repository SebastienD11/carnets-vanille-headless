<template>
  <div class="max-w-screen-lg mx-auto p-10">
    <nuxt-link :to="`/`"><Logo /></nuxt-link>
    <h1 class="text-2xl text-center my-12">Try GraphQL Request - With Store</h1>
    <MainMenu />
    <hr class="my-12" />
    <Nuxt />
    <hr class="my-12" />
    <FooterMenu />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
