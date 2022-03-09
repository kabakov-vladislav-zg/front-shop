<template>
  <div
    class="menu-filter"
    @input="setFilters"
  >
    <h2 class="text-light">Фильтры</h2>

    <div class="text-light">Найдено товаров: {{count}}</div>

    <MenuFilterQualities
      v-model="qualities"
    />
  </div>
</template>

<script>
import MenuFilterQualities from "./MenuFilterQualities";
export default {
  name: "MenuFilter",
  components: {MenuFilterQualities},
  data() {
    return {
      count: 0,

      qualities: null
    }
  },

  methods: {
    async setFilters() {
      let products = await this.$api.getProductsMeta({
        category: this.$route.params.category,
        qualities: this.qualities
      })
      this.count = products.meta.pagination.total
    }
  },

  created() {
    let { qualities } = this.$route.query
    this.qualities = JSON.parse(qualities || '{}')

    this.setFilters()
  }
}
</script>

<style>

</style>
