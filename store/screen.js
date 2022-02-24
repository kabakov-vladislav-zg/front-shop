export const state = () => ({
  clientWidth: NaN,
  clientHeight: NaN
})

export const mutations = {
  setClientWidth(state, value) {
    state.clientWidth = value
  },
  setClientHeight(state, value) {
    state.clientHeight = value
  }
}
