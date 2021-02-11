<template>
  <div>
    <PostsList :posts="posts" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  head() {
    return {
      htmlAttrs: {},
      title: this.settings.generalSettingsTitle,
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  computed: {
    ...mapState(['posts', 'settings']),
  },
})
</script>
