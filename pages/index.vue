<template>
  <div>
    <PostsList :posts="posts" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['posts']),
  },
})
</script>
