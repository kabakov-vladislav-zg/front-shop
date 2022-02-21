import qs from 'qs'

class Api {
  constructor(store, axios, qs) {
    this._store = store
    this._axios = axios
    this._qs = qs
  }

  async get(param, query) {
    let request = `/${param}?${this._qs.stringify(query, { encodeValuesOnly: true })}`
    if (!this._store.state.cache.requests[request]) {
      let response = await this._axios.$get(request)
      this._store.commit('cache/setRequests', { request, response })
    }
    return JSON.parse(JSON.stringify(this._store.state.cache.requests[request]))
  }
}

export default ({ app: { $axios, store } }, inject) => {
  inject('api', new Api(store, $axios, qs))
}
