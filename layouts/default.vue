<template>
  <div class="max-w-screen-lg p-10 mx-auto">
    <nuxt-link :to="`/`"><Logo /></nuxt-link>
    <MainMenu class="my-12" />
    <Nuxt />
    <hr class="my-6" />
    <FooterMenu />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
