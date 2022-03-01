class ResizeObserver {
  constructor(store) {
    this._store = store
    const mediaQuery = window.matchMedia('(min-width: 992px)')

    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener('resize', this.onresize.bind(this))
      this.onresize()
      mediaQuery.addEventListener('change', this.onchange.bind(this))
      this.onchange(mediaQuery)
    })
  }
  onresize() {
    this._store.commit('screen/setClientWidth', document.documentElement.clientWidth )
    this._store.commit('screen/setClientHeight', document.documentElement.clientHeight )
  }

  onchange(e) {
    this._store.commit('screen/setIsDesktop', e.matches )
  }
}

export default ({ store }) => {
  new ResizeObserver(store)
}
