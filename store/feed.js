export const state = () => ({
  qualities: null,

  pageCount: null,

  currentFilters: null,
  current: {
    filters: null,
    page: null,
    sort: 'updatedAt:desc'
  }
})

export const mutations = {
  setQualities(state, value) {
    state.qualities = value
  },
  setPageCount(state, value) {
    state.pageCount = value
  },
  setCurrent(state, { key, value }) {
    console.log(window)
    console.log(this)
    state.current[key] = value
  }
}
