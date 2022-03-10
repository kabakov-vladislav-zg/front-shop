export default  {
  set(state, { key, value }) {
    state[key] = value
  },
  unshiftPage(state, products) {
    state.pages.unshift(products)
  },
  pushPage(state, products) {
    state.pages.push(products)
  }
}
