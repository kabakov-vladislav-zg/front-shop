<template>
  <div class="pagination">
    <a
      v-for="page in pageCount"
      :key="page + path"
      @click.prevent="setPage(page)"
      :href="getHref(page)"

      class="pagination__link"
    >
      <span
        class="pagination__label"
        :class="{'pagination__label_active' : currentPage === page }"
      >
        {{ page }}
      </span>
    </a>
  </div>
</template>

<script>
export default {
  name: "FeedToolbarPagination",

  computed: {
    currentPage() {
      return Number(this.$route.query.page) || 1
    },
    path() {
      return this.$route.path
    },
    filters() {
      return this.$route.query.filters
    },
    pageCount() {
      return this.$store.state.feed.pageCount
    }
  },

  methods: {
    setPage(page) {
      this.$store.commit('feed/setCurrent', {
        key: 'page',
        value: page
      })
    },
    getHref(page) {
      return this.path + (page > 1 ? '?page=' + page : '') + (this.filters ? '&filters=' + this.filters : '')
    }
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  flex-basis: 0;
}
.pagination__link {
  flex: 0 0 auto;
  padding: .5rem .75rem;
}
.pagination__label {
  display: inline-block;
  color: $dark;
  font-weight: bold;
  background: #fff;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  text-decoration: none;

  &_active {
    background: $danger;
  }
}
</style>
