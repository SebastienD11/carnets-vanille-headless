<template>
  <div class="max-w-screen-lg mx-auto p-10">
    <div v-for="(category, index) in categories.nodes" :key="category.id">
      <div :key="index" class="lg:flex lg:max-w-screen-lg pb-8 lg:pb-16">
        <div class="lg:w-3/4 lg:pl-8">
          <h4 class="text-xl lg:text-3xl font-normal leading-tight">
            {{ category.name }}
          </h4>
          <p>
            {{ category.description }}
          </p>
          <nuxt-link
            :to="`/category/${category.slug}`"
            class="underline p-4 text-red-500"
          >
            post Info
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      nodes {
        name
        count
        description
        categoryId
        slug
      }
    }
  }
`

export default Vue.extend({
  apollo: {
    categories: {
      prefetch: true,
      query: GET_CATEGORIES,
    },
  },
})
</script>
