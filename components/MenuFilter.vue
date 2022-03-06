<template>
  <div class="menu-filter">
    <h2 class="text-light">Фильтры</h2>
    <span class="text-light">
    {{currentFilters}}
    </span>
    <div
      v-for="(filter, nameFilter) in filters"
      :key="filter.title"
    >
      <h3 class="text-light">
        {{ filter.title }}
      </h3>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="currentFilters[nameFilter]"
      >
        <option
          v-for="(option, nameOption) in filter.value"
          :value="nameOption"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <button
      @click="setFilters"
      class="btn btn-dark"
    >
      Применить
    </button>
  </div>
</template>

<script>
export default {
  name: "MenuFilter",

  data() {
    return {
      currentFilters: null
    }
  },

  methods: {
    setFilters() {
      this.$emit('close')

      let currentFilters = {}
      for (const filter in this.currentFilters) {
        if(this.currentFilters[filter] !== 'null') {
          currentFilters[filter] = this.currentFilters[filter]
        }
      }

      if(Object.keys(currentFilters).length) {
        currentFilters = JSON.stringify(currentFilters)
      } else {
        currentFilters = null
      }

      this.$store.commit('feed/setCurrentFilters', {
        page: 1,
        filters: currentFilters
      })
    }
  },

  computed: {
    filters() {
      return this.$store.state.feed.filters
    }
  },

  watch: {
    '$route.query.filters': {
      immediate: true,
      handler(filters = '{}') {
        let currentFilters = {}
        for (const filter of Object.keys(this.filters)) {
          currentFilters[filter] = 'null'
        }

        Object.assign(currentFilters, JSON.parse(filters))

        this.currentFilters = currentFilters
      }
    }
  }
}
</script>

<style scoped>

</style>
