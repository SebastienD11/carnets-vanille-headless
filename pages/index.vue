<template>
  <div class="max-w-screen-lg mx-auto p-10">
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
    <div v-for="(post, index) in posts" :key="post.id">
      <div :key="index" class="">
        <div class="">
          <h4 class="text-xl lg:text-3xl font-normal leading-tight">
            {{ post.title }}
          </h4>
          <nuxt-link :to="`/${post.slug}`" class="underline p-4 text-red-500">
            post Info
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['posts', 'categories']),
  },
})
</script>
