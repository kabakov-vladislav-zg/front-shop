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
    let qualities = query.qualities ? JSON.parse(query.qualities) : null
    let url = params.category
    if (query.sort) {
      store.commit('feed/setCurrent', { key: 'sort', value: query.sort })
    }
    let sort = store.state.feed.current.sort

    let [category, products] = await Promise.all([
      $api.getCategory(url),
      $api.getProducts({
        category: url,
        page,
        qualities,
        sort
      })
    ])

    let description = category.data[0].attributes.description
    let placeholder = category.data[0].attributes.placeholder.data.attributes

    let pageCount = products.meta.pagination.pageCount
    let allQualities = category.data[0].attributes.qualities

    store.commit('feed/setPageCount', pageCount)
    store.commit('feed/setQualities', allQualities)

    console.log(products)
    console.log(category)
    return {
      url,
      qualities,
      sort,
      description,
      placeholder,
      pages: [ products ],
      page,
      start: page,
      end: page,
      pageCount
    }
  },

  data() {
    return {
      pageObserver: null
    }
  },

  computed: {
    currentFilters() {
      return this.$store.state.feed.current.filters
    },
    currentPage() {
      return this.$store.state.feed.current.page
    },
    currentSort() {
      return this.$store.state.feed.current.sort
    }
  },

  watch: {
    currentSort(sort) {
      this.update({ sort })
    },
    currentPage(page) {
      if(!page) return
      this.$store.commit('feed/setCurrent', {
        key: 'page',
        value: null
      })

      this.update({ page })
    },
    currentFilters(qualities) {
      this.update({ qualities })
    }
  },

  methods: {
    async update({ category = this.url, qualities = this.qualities, page = 1, sort = this.sort }) {
      let products = await this.$api.getProducts({ category, page, qualities, sort })

      this.pageCount = products.meta.pagination.pageCount
      this.$store.commit('feed/setPageCount', this.pageCount)

      this.qualities = qualities
      this.page = this.start = this.end = page
      this.sort = sort
      this.pages = [ products ]

      this.setHistory({ page, qualities, sort })

      window.scrollTo(0,0)

      this.setStart()
    },

    observe(elem) {
      if (!this.pageObserver) {
        this.pageObserver = new IntersectionObserver(this.setCurrentPage.bind(this))
      }
      this.pageObserver.observe(elem)
    },

    setCurrentPage(e) {
      if(e[0].isIntersecting) {
        let page = e[0].target.page

        this.setHistory({ page })
        this.page = page
      }
    },

    setHistory({ page = 1, qualities = this.qualities, sort = this.sort }) {
      let currentQualities
      if (qualities) currentQualities = JSON.stringify(qualities)

      if (
        currentQualities === this.$route.query.qualities
        && page === (Number(this.$route.query.page) || 1)
        && sort === (this.$route.query.sort || 'updatedAt:desc')
      ) return

      let query = {}

      if(page > 1) {
        query.page = page
      }

      if(currentQualities) {
        query.qualities = currentQualities
      }

      if(sort !== 'updatedAt:desc') {
        query.sort = sort
      }

      this.$router.replace({ query })
    },

    async setStart() {
      if (this.start <= 1) return
      this.start -= 1
      let products = await this.$api.getProducts({
        category: this.url,
        page: this.start,
        qualities: this.qualities,
        sort: this.sort
      })
      this.pages.unshift(products)
    },

    async setEnd() {
      if (this.end >= this.pageCount) return
      this.end += 1
      let products = await this.$api.getProducts({
        category: this.url,
        page: this.end,
        qualities: this.qualities,
        sort: this.sort
      })
      this.pages.push(products)
    }
  }
}
</script>
