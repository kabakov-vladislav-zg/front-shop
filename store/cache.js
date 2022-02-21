export const state = () => ({
  requests: {}
})

export const mutations = {
  setRequests(state, { request, response }) {
    state.requests[request] = response
  }
}
