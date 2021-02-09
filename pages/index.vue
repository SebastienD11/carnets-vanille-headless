<template>
  <div class="max-w-screen-lg mx-auto p-10">
    <h1>Try GraphQL (nuxt/apollo) - Without Store</h1>
    <div v-for="(post, index) in posts.nodes" :key="post.id">
      <div :key="index" class="lg:flex lg:max-w-screen-lg pb-8 lg:pb-16">
        <div class="lg:w-1/4"></div>
        <div class="lg:w-3/4 lg:pl-8">
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

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

const GET_POSTS = gql`
  query getPosts {
    posts(first: 200) {
      nodes {
        id
        slug
        title
        content
        categories {
          nodes {
            categoryId
          }
        }
      }
    }
  }
`

export default Vue.extend({
  apollo: {
    posts: {
      query: GET_POSTS,
    },
  },
})
</script>
