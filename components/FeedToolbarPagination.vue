<template>
  <div class="pagination">
    <a
      v-for="page in pageCount"
      :key="path + page"
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
import qs from 'qs'

export default {
  name: "FeedToolbarPagination",

  computed: {
    currentPage() {
      return this.$store.state.feed.page
    },
    path() {
      return this.$route.path
    },
    pageCount() {
      return this.$store.state.feed.pageCount
    },
    query() {
      let qualities = this.$store.state.feed.qualities
      let sort = this.$store.state.feed.sort

      let query = {}
      if (qualities) query.qualities = qualities
      if (sort !== 'updatedAt:desc') query.sort = sort
      return Object.keys(query).length ? qs.stringify(query) : ''
    }
  },

  methods: {
    setPage(page) {
      this.$store.dispatch('feed/update', { page: page })
    },
    getHref(page) {
      let href = this.path
      if (page > 1) {
        href += `?page=${page}`
        if (this.query) href += '&' + this.query
      } else {
        if (this.query) href += '?' + this.query
      }
      return href
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
