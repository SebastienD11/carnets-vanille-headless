<template>
  <div v-if="post" class="max-w-screen-lg mx-auto p-10">
    TEMPLATE POST _SLUG
    {{ post.title }}
    <div class="mb-4" v-html="post.content"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

const GET_POST = gql`
  query Post($slug: ID!) {
    post(id: $slug, idType: SLUG) {
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
`

export default Vue.extend({
  data() {
    return {
      slug: this.$route.params.slug,
    }
  },
  apollo: {
    post: {
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: GET_POST,
    },
  },
})
</script>
