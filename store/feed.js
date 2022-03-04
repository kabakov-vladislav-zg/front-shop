export const state = () => ({
  filter: {},
  currentFilter: {}
})

export const mutations = {
  setFilter(state, value) {
    state.filter = value
  },
  setCurrentFilter(state, value) {
    state.currentFilter = value
  }
}
