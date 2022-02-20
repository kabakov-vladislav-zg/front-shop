import config from '../config'

export const state = () => ({
  categories: []
})

export const mutations = {
  setCategory(state, value) {
    state.categories = value
  },
  setTags(state, value) {
    state.tags = value
  },
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    let categories = await this.$axios(config.api + '/categories?fields[0]=title&fields[1]=slug')
    let tags = await this.$axios(config.api + '/tags?fields[0]=title&fields[1]=slug')
    commit('setCategory', categories.data.data)
    commit('setTags', tags.data.data)
  }
}
