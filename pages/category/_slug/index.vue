<template>
  <div v-if="category" class="max-w-screen-lg mx-auto p-10">
    TEMPLATE CATEGORY _SLUG<br />
    {{ category.name }}<br />
    DESC: {{ category.description }} <br />
    COUNT: {{ category.count }} <br />
    <hr />

    <div v-for="(post, index) in postsForCategory" :key="post.id">
      <div :key="index" class="lg:flex lg:max-w-screen-lg pb-8 lg:pb-16">
        <div class="lg:w-1/4"></div>
        <div class="lg:w-3/4 lg:pl-8">
          <h4 class="text-xl lg:text-3xl font-normal leading-tight">
            {{ post.title }}
          </h4>
          <nuxt-link :to="`/${post.slug}`" class="underline p-4 text-red-500">
            post Info
          </nuxt-link>
        </div>
      </div>
    </div>
    <nuxt-link :to="`/category/${slug}/2`" class="underline p-4 text-red-500">
      page 2
    </nuxt-link>
    <nuxt-link :to="`/category/${slug}/3`" class="underline p-4 text-red-500">
      page 3
    </nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      slug: this.$route.params.category,
    }
  },
  computed: {
    ...mapState(['categories', 'posts']),
    category() {
      return this.categories.find((el) => el.slug === this.slug)
    },
    postsForCategory() {
      return this.posts.filter((el) => {
        const categories = []
        el.categories.nodes.forEach((category) => {
          categories.push(category.categoryId)
        })
        return categories.includes(this.category.categoryId)
      })
    },
  },
})
</script>
