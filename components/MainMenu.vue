<template>
  <div class="flex justify-center">
    <div v-for="item in mainMenu">
      <div class="px-2 mx-4">
        <nuxt-link
          :to="getSlug(item.connectedNode.node.uri)"
          class="p-4 text-red-500 underline"
        >
          <h4 class="font-normal leading-tight text-red-500">
            {{ item.connectedNode.node.name }}
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
      return this.menus['main-menu'][0].menuItems.nodes
    },
  },
  methods: {
    getSlug(uri: String): String {
      return '/' + uri.replace('/index.php/', '')
    },
  },
})
</script>
