<template>
  <InfiniteFeed
    class="category"
    @top="setStart"
    @bottom="setEnd"
  >
    <InfiniteFeedPage
      v-for="(page, index) in pages"
      :key="page.meta.pagination.page"
      :top="(index === 0) && (pages.length > 1)"
      class="row row-cols-3 g-3"
    >
      <div
        v-for="product in page.data"
        :key="product.attributes.slug"
        class="col"
      >
        <CardProduct
          class="h-100"
          :title="product.attributes.title"
          :slug="product.attributes.slug"
          :description="product.attributes.description"
          :img="product.attributes.img.data ? product.attributes.img.data[0].attributes : placeholder"
          :price="product.attributes.price"
        />
      </div>
    </InfiniteFeedPage>
  </InfiniteFeed>
</template>

<script>
import CardProduct from "../../components/CardProduct"
import InfiniteFeed from "../../components/InfiniteFeed";
import InfiniteFeedPage from "../../components/InfiniteFeedPage";
export default {
  name: "Category",
  components: {InfiniteFeedPage, InfiniteFeed, CardProduct},

  async asyncData({ $api, params, query }) {
    let page = Number(query.page || 1)
    let route = params.category
    let [category, products] = await Promise.all([
      $api.getCategory(route),
      $api.getProducts(route, page)
    ])

    let description = category.data[0].attributes.description
    let placeholder = category.data[0].attributes.placeholder.data.attributes

    let pageCount = products.meta.pagination.pageCount

    console.log(products)
    console.log(category)
    return {
      route,
      description,
      placeholder,
      pages: [ products ],
      page,
      start: page,
      end: page,
      pageCount
    }
  },

  methods: {
    async setStart() {
      if (this.start <= 1) return
      this.start -= 1
      let products = await this.$api.getProducts(this.route, this.start)
      this.pages.unshift(products)
    },
    async setEnd() {
      if (this.end >= this.pageCount) return
      this.end += 1
      let products = await this.$api.getProducts(this.route, this.end)
      this.pages.push(products)
    }
  }
}
</script>
