<template>
  <div v-if="category" class="max-w-screen-lg mx-auto p-10">
    TEMPLATE CATEGORY _SLUG<br />
    {{ category.name }}<br />
    DESC: {{ category.description }} <br />
    COUNT: {{ category.count }} <br />
    <hr />

    <div v-for="(post, index) in category.posts.nodes" :key="post.id">
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
  </div>
</template>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

const GET_CATEGORY = gql`
  query Category($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      id
      slug
      name
      count
      description
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
  }
`

export default Vue.extend({
  data() {
    return {
      slug: this.$route.params.slug,
    }
  },
  apollo: {
    category: {
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: GET_CATEGORY,
    },
  },
})
</script>
