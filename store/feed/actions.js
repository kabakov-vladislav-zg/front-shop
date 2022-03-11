import qs from 'qs'

export default {
  async init({ commit, dispatch }) {
    let { query, params } = this.$router.history.current

    let page = Number(query.page) || 1
    commit('set', { key: 'page', value: page })
    commit('set', { key: 'start', value: page })
    commit('set', { key: 'end', value: page })
    commit('set', { key: 'qualities', value: query.qualities ? JSON.parse(query.qualities) : null })
    commit('set', { key: 'category', value: params.category })
    if (query.sort) {
      commit('set', { key: 'sort', value: query.sort })
    }

    await Promise.all([
      dispatch('getCategory'),
      dispatch('getProducts')
    ])
  },

  async update({ commit, dispatch }, { page = 1, qualities = null, sort = null }) {
    commit('set', { key: 'page', value: page })
    commit('set', { key: 'start', value: page })
    commit('set', { key: 'end', value: page })

    if (qualities) commit('set', { key: 'qualities', value: qualities })
    if (sort) commit('set', { key: 'sort', value: sort })

    await dispatch('getProducts')

    dispatch('setHistory')
    dispatch('unshiftPage')

    window.scrollTo(0,0)
  },

  async unshiftPage({ state, commit }) {
    let { category, start, qualities, sort } = state
    if (start <= 1) return

    let page = start - 1
    commit('set', { key: 'start', value: page })
    let products = await this.$api.getProducts({
      category,
      page,
      qualities,
      sort
    })

    commit('unshiftPage', products)
  },

  async pushPage({ state, commit }) {
    let { category, end, qualities, sort, pageCount } = state
    if (end >= pageCount) return

    let page = end + 1
    commit('set', { key: 'end', value: page })
    let products = await this.$api.getProducts({
      category,
      page,
      qualities,
      sort
    })

    commit('pushPage', products)
  },

  observe({ state, commit, dispatch }, elem) {
    if (!state.pageObserver) {
      commit('set', {
        key: 'pageObserver',
        value: new IntersectionObserver(dispatch.bind(this, 'setCurrentPage'))
      })
    }
    state.pageObserver.observe(elem)
  },

  setCurrentPage({ commit, dispatch }, e) {
    if(e[0].isIntersecting) {
      commit('set', { key: 'page', value: e[0].target.page })
      dispatch('setHistory')
    }
  },

  async getCategory({ state, commit }) {
    let categories = await this.$api.getCategory(state.category)

    let category = categories.data[0].attributes
    commit('set', { key: 'description', value: category.description })
    commit('set', { key: 'placeholder', value: category.placeholder.data.attributes })
    commit('set', { key: 'allQualities', value: category.qualities })
  },

  setHistory({ state }) {
    let { page, qualities, sort } = state
    if (qualities) qualities = JSON.stringify(qualities)
    let current = this.$router.history.current.query

    if (
      qualities === (current.qualities || null)
      && page === (Number(current.page) || 1)
      && sort === (current.sort || 'updatedAt:desc')
    ) return

    let query = {}
    if(page > 1) query.page = page
    if(qualities) query.qualities = qualities
    if(sort !== 'updatedAt:desc') query.sort = sort

    this.$router.replace({ query })
  },

  async getProducts({ state, commit }) {
    let { category, page, qualities, sort } = state
    let products = await this.$api.getProducts({
      category,
      page,
      qualities,
      sort
    })

    commit('set', { key: 'pages', value: [ products ] })
    commit('set', { key: 'pageCount', value: products.meta.pagination.pageCount })
  }
}
