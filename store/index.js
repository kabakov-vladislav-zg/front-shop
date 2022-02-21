import qs from 'qs'

export const state = () => ({
  catalog: [],
})

export const mutations = {
  setCatalog(state, value) {
    state.catalog = value
  }
}

export const actions = {
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
