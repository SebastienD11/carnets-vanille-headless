<template>
  <div class="max-w-screen-lg mx-auto p-10">
    <h1>Try GraphQL (nuxt/apollo) - With Store</h1>
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
          <div class="mb-4" v-html="post.content"></div>
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
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['posts']),
    ...mapState(['categories']),
  },
  created() {
    this.getPosts()
    this.getCategories()
  },
  methods: {
    ...mapActions(['getPosts', 'getCategories']),
  },
})
</script>
