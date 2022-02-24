<template>
  <main class="category">
    <div
      v-for="product in products"
      :key="product.attributes.slug"
      class="card w-50"
    >
      <div class="card-body">
        {{ product.attributes.slug }}
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Category",
  components: {},
  data() {
    return {
      products: []
    }
  },

  async fetch() {
    let products = await this.$api.get('products', {
      filters: {
        category: {
          slug: {
            $eq: this.$route.params.category
          }
        }
      },
      fields: ['slug'],
      pagination: {
        pageSize: 12,
        page: 1,
      },
    })
    this.products = products.data
  }
}
</script>

<style scoped lang="scss">
.category {
  height: 300vh;
}
</style>
