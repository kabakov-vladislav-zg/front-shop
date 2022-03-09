import qs from 'qs'

class Api {
  constructor(store, axios, qs) {
    this._store = store
    this._axios = axios
    this._qs = qs
  }

  async _get(param, query) {
    let request = `/${param}?${this._qs.stringify(query, { encodeValuesOnly: true })}`
    if (!this._store.state.cache.requests[request]) {
      let response = await this._axios.$get(request)
      this._store.commit('cache/setRequests', { request, response })
    }
    return JSON.parse(JSON.stringify(this._store.state.cache.requests[request]))
  }

  _getQualities(qualities) {
    let query = {}

    for (const quality in qualities) {
      query[quality] = {
        $eq: qualities[quality]
      }
    }

    return query
  }

  async getProductsMeta({ category, qualities = null }) {
    let query = {
      filters: {
        category: {
          slug: {
            $eq: category
          }
        }
      },
      fields: ['sale'],
      pagination: {
        pageSize: 1,
      },
    }

    if (qualities) {
      query.filters.qualities = this._getQualities(qualities)
    }

    return this._get('products', query)
  }

  async getProducts({ category, page, qualities, sort }) {
    let query = {
      filters: {
        category: {
          slug: {
            $eq: category
          }
        }
      },
      fields: [ 'title, slug, description, price', 'sale' ],
      populate: [ 'picture' ],
      sort: [ sort ],
      pagination: {
        pageSize: 12,
        page: page,
      },
    }

    if (qualities) {
      query.filters.qualities = this._getQualities(qualities)
    }

    return this._get('products', query)
  }
  async getCategory(category) {
    return this._get('categories', {
      filters: {
        slug: {
          $eq: category
        }
      },
      fields: ['title, description', 'qualities'],
      populate: ['placeholder'],
    })
  }
}

export default ( { app: { $axios, store } }, inject) => {
  inject('api', new Api(store, $axios, qs))
}
