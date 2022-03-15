<template>
  <div
    class="menu-filter"
    @input="setFilters"
  >
    <button
      @click="rebut"
      class="btn btn-dark float-end"
    >
      сбросить
    </button>
    <h2 class="text-light">Фильтры</h2>

    <div class="text-light">Найдено товаров: {{ count }}</div>

    <MenuFilterQualities
      v-model="qualities"
    />

    <button
      @click="update"
      class="btn btn-dark"
    >
      применить
    </button>
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

      qualities: {}
    }
  },

  methods: {
    update() {
      this.$store.dispatch('feed/update', { qualities: this.qualities })
      this.$emit('close')
    },
    rebut() {
      this.qualities = {}
      this.setFilters()
    },
    async setFilters() {
      let products = await this.$api.getProductsMeta({
        category: this.$route.params.category,
        qualities: this.qualities
      })
      this.count = products.meta.pagination.total
    }
  },

  created() {
    this.qualities = this.$store.state.feed.qualities || {}
    this.setFilters()
  }
}
</script>

<style>

</style>
