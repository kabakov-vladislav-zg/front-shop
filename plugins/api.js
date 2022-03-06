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

  async getProducts(category, page, filters) {
    let query = {
      filters: {
        category: {
          slug: {
            $eq: category
          }
        }
      },
      fields: ['title, slug, description, price', 'sale'],
      populate: ['picture'],
      pagination: {
        pageSize: 12,
        page: page,
      },
    }

    if (filters) {
      filters = JSON.parse(filters)

      let characteristics = {}

      for (const filter in filters) {
        characteristics[filter] = {}
        characteristics[filter].$eq = filters[filter]
      }

      query.filters.characteristics = characteristics
    }

    return this.get('products', query)
  }
  async getCategory(category) {
    return this.get('categories', {
      filters: {
        slug: {
          $eq: category
        }
      },
      fields: ['title, description', 'settings'],
      populate: ['placeholder'],
    })
  }
}

export default ({ app: { $axios, store } }, inject) => {
  inject('api', new Api(store, $axios, qs))
}
