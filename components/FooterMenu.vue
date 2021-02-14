<template>
  <div class="flex">
    <div v-for="item in mainMenu">
      <div class="mx-4 px-2">
        <nuxt-link
          :to="getSlug(item.connectedNode.node.uri)"
          class="underline p-4 text-red-500"
        >
          <h4 class="font-normal leading-tight text-red-500">
            {{ item.connectedNode.node.title }}
          </h4>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['menus']),
    mainMenu() {
      return this.menus['footer-menu'][0].menuItems.nodes
    },
  },
  methods: {
    getSlug(uri: String): String {
      return '/p/' + uri.replace('/index.php/', '')
    },
  },
})
</script>
