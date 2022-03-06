export const state = () => ({
  filters: null,

  pageCount: null,

  currentFilters: null
})

export const mutations = {
  setFilters(state, value) {
    state.filters = value
  },
  setPageCount(state, value) {
    state.pageCount = value
  },
  setCurrentFilters(state, value) {
    console.log(value)
    state.currentFilters = value
  }
}
