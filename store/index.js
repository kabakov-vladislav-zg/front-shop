import qs from 'qs'

export const state = () => ({
  catalog: [],
  tools: {
    display: false,
    component: 'MenuNavigation'
  },
})

export const getters = {
  isToolsOpen(state) {
    return state.tools.display
  },
  tool(state) {
    return state.tools.component
  }
}

export const mutations = {
  setCatalog(state, value) {
    state.catalog = value
  },
  setToolsDisplay(state, value) {
    state.tools.display = value
  },
  setToolsComponent(state, value) {
    state.tools.component = value
  },
}

export const actions = {
  openTool({ commit }, component) {
    commit('setToolsDisplay', true)
    commit('setToolsComponent', component)
  },
  closeTool({ commit }) {
    commit('setToolsDisplay', false)
  },

  async nuxtServerInit ({ commit }) {
    let query = qs.stringify({
      fields: ['title', 'slug', 'order'],
      sort: ['order']
    }, { encodeValuesOnly: true })
    let [categories, tags] = await Promise.all([
      this.$axios.$get(`/categories?${query}`),
      this.$axios.$get(`/tags?${query}`)
    ])
    commit('setCatalog', [].concat(tags.data, categories.data))
  }
}
