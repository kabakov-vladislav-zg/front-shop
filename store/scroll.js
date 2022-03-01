export const state = () => ({
  top: false,
  up: false,
  from: 0,
  to: 0
})

export const getters = {
  isToTop(state) {
    return state.up || state.top
  }
}

export const mutations = {
  setTop(state, value) {
    state.top = value
  },
  setFrom(state, value) {
    state.from = value
  },
  setTo(state, value) {
    state.to = value
  },
  setUp(state, value) {
    state.up = value
  },
}
export const actions = {
  getPosition({ state, commit }, y) {
    commit('setTop', y <= 100)
    commit('setFrom', state.to)
    commit('setTo', y)
    commit('setUp', state.to <= state.from)
  }
}
