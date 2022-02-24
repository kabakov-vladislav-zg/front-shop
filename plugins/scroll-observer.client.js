class ScrollObserver {
  constructor(store) {
    this._store = store

    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener('scroll', this)
      this.handleEvent()
    })
  }
  handleEvent() {
    this._store.dispatch('scroll/getPosition', window.pageYOffset )
  }
}

export default ({ store }) => {
  new ScrollObserver(store)
}
