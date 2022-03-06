<template>
  <FeedContainer
    class="category"
    @top="setStart"
    @bottom="setEnd"
  >
    <FeedContainerPage
      v-for="(page, index) in pages"
      :key="page.meta.pagination.page"
      :page="page.meta.pagination.page"
      :top="(index === 0) && (pages.length > 1)"
      @init="observe"
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

  async asyncData({ $api, params, query, store }) {
    let page = Number(query.page || 1)
    let filters = query.filters
    let url = params.category

    let [category, products] = await Promise.all([
      $api.getCategory(url),
      $api.getProducts(url, page, filters)
    ])

    let description = category.data[0].attributes.description
    let placeholder = category.data[0].attributes.placeholder.data.attributes

    let pageCount = products.meta.pagination.pageCount
    let settings = category.data[0].attributes.settings

    store.commit('feed/setPageCount', pageCount)
    store.commit('feed/setFilters', settings)

    console.log(products)
    console.log(category)
    return {
      url,
      filters,
      description,
      placeholder,
      pages: [ products ],
      page,
      start: page,
      end: page,
      pageCount
    }
  },

  computed: {
    currentFilters() {
      return this.$store.state.feed.currentFilters
    }
  },

  watch: {
    currentFilters: {
      async handler({ page, filters }) {
        let products = await this.$api.getProducts(this.url, page, filters)

        let pageCount = products.meta.pagination.pageCount
        this.$store.commit('feed/setPageCount', pageCount)

        this.start = page
        this.end = page

        window.scrollTo(0,0)
        this.setHistory({ page, filters })

        this.pages = [products]

        await this.setStart()
      }
    }
  },

  data() {
    return {
      pageObserver: null
    }
  },

  methods: {
    observe(elem) {
      if (!this.pageObserver) {
        this.pageObserver = new IntersectionObserver(this.setCurrentPage.bind(this))
      }
      this.pageObserver.observe(elem)
    },

    setCurrentPage(e) {
      if(e[0].isIntersecting) {
        let page = e[0].target.page

        this.setHistory({ page, filters: this.filters })
      }
    },

    setHistory({ page, filters }) {
      if (filters === this.$route.query.filters && page === this.$route.query.page) return

      let query = {}

      this.page = page
      if(page > 1) {
        query.page = page
      }

      this.filters = filters
      if(this.filters) {
        query.filters = filters
      }

      this.$router.replace({ query })
    },

    async setStart() {
      if (this.start <= 1) return
      this.start -= 1
      let products = await this.$api.getProducts(this.url, this.start, this.filters)
      this.pages.unshift(products)
    },

    async setEnd() {
      if (this.end >= this.pageCount) return
      this.end += 1
      let products = await this.$api.getProducts(this.url, this.end, this.filters)
      this.pages.push(products)
    }
  }
}
</script>
