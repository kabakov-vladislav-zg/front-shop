<template>
  <main class="feed-container container-fluid">
    <div ref="top"></div>
    <slot></slot>
    <div ref="bottom"></div>
  </main>
</template>

<script>
export default {
  name: "FeedContainer",

  mounted() {
    let top = new IntersectionObserver((e) => {
      if(e[0].isIntersecting) this.$store.dispatch('feed/unshiftPage')
    }, { rootMargin: '1000px' })
    top.observe(this.$refs.top)

    let bottom = new IntersectionObserver((e) => {
      if(e[0].isIntersecting) this.$store.dispatch('feed/pushPage')
    }, { rootMargin: '1000px' })
    bottom.observe(this.$refs.bottom)
  }
}
</script>
