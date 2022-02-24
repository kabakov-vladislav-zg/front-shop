class ResizeObserver {
  constructor(store) {
    this._store = store

    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener('resize', this)
      this.handleEvent()
    })
  }
  handleEvent() {
    this._store.commit('screen/setClientWidth', document.documentElement.clientWidth )
    this._store.commit('screen/setClientHeight', document.documentElement.clientHeight )
  }
}

export default ({ store }) => {
  new ResizeObserver(store)
}
