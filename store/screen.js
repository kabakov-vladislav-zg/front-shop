export const state = () => ({
  clientWidth: NaN,
  clientHeight: NaN,
  isDesktop: null
})

export const mutations = {
  setClientWidth(state, value) {
    state.clientWidth = value
  },
  setClientHeight(state, value) {
    state.clientHeight = value
  },
  setIsDesktop(state, value) {
    state.isDesktop = value
  }
}

export const getters = {
  isDesktop(state) {
    return state.isDesktop
  },
  isMobile(state) {
    return state.clientWidth < 768
  },
  isTablet(state) {
    return 768 <= state.clientWidth < 992
  },
  getClientHeight(state) {
    return state.clientHeight
  },
  getClientWidth(state) {
    return state.clientWidth
  }
}
