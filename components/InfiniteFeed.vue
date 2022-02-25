<template>
  <main class="infinite-feed container-fluid">
    <div ref="top"></div>
    <slot></slot>
    <div ref="bottom"></div>
  </main>
</template>

<script>
export default {
  name: "InfiniteFeed",

  mounted() {
    let top = new IntersectionObserver((e) => {
      console.log('top', e[0].isIntersecting)
      if(e[0].isIntersecting) this.$emit('top')
    }, { rootMargin: '1000px' })
    top.observe(this.$refs.top)

    let bottom = new IntersectionObserver((e) => {
      console.log('bottom', e[0].isIntersecting)
      if(e[0].isIntersecting) this.$emit('bottom')
    }, { rootMargin: '1000px' })
    bottom.observe(this.$refs.bottom)
  }
}
</script>

<style lang="scss">
.infinite-feed {

}
</style>
