<template>
  <section class="category">
    <div
      v-for="product in products"
      :key="product.attributes.slug"
      class=""
    >
      {{ product.attributes.slug }}
    </div>
  </section>
</template>

<script>
export default {
  name: "Category",

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

<style scoped>

</style>
