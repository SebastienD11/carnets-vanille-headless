<template>
  <div>
    <div v-for="(category, index) in categories" :key="category.id">
      <div :key="index">
        <div>
          <h4 class="lg:text-3xl text-xl font-normal leading-tight">
            {{ category.name }}
          </h4>
          <p>
            {{ category.description }}
          </p>
          <nuxt-link
            :to="`/category/${category.slug}`"
            class="p-4 text-red-500 underline"
          >
            Category Info
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['categories']),
  },
})
</script>
