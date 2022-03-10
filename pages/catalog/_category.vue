<template>
  <FeedContainer class="category">
    <FeedContainerPage
      v-for="(page, index) in pages"
      :key="page.meta.pagination.page"
      :page="page.meta.pagination.page"
      :top="(index === 0) && (pages.length > 1)"
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
          :picture="product.attributes.picture.data ? product.attributes.picture.data[0].attributes : placeholder"
          :price="product.attributes.price"
        />
      </div>
    </FeedContainerPage>
  </FeedContainer>
</template>

<script>
import CardProduct from "../../components/CardProduct"
import FeedContainer from "../../components/FeedContainer";
import FeedContainerPage from "../../components/FeedContainerPage";
export default {
  name: "Category",
  components: {FeedContainerPage, FeedContainer, CardProduct},

  async asyncData({ store }) {
    await store.dispatch('feed/init')
    return {}
  },

  computed: {
    pages() {
      return this.$store.state.feed.pages
    },
    placeholder() {
      return this.$store.state.feed.placeholder
    },
  }
}
</script>
