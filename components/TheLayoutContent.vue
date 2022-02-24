<template>
  <div
    class="content"
    :class="{'content_slide-left': slideLeft}"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TheLayoutContent",

  data() {
    return {
      slideLeft: false
    }
  },

  watch: {
    $route(to, from) {
      let finish = to.path.split('/').pop()
      let start = from.path.split('/').pop()
      this.slideLeft = this.routs.indexOf(start) > this.routs.indexOf(finish)
    }
  },

  computed: {
    routs() {
      let catalog = this.$store.state.catalog
      catalog = catalog.map(route => route.attributes.slug)
      catalog = catalog.concat(['account', 'blog', 'delivery'])
      catalog.unshift('')

      return catalog
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  position: relative;

  & /deep/ {
    .page-enter {
      transform: translateX(-10%);
      opacity: 0;
    }
    .page-leave-to {
      transform: translateX(10%);
      opacity: 0;
    }
    .page-enter-active,
    .page-leave-active{
      transition: transform .25s ease-in, opacity .25s ease-in;
    }
  }
}

.content_slide-left /deep/ {
  .page-enter {
    transform: translateX(10%);
  }
  .page-leave-to {
    transform: translateX(-10%);
  }
}
</style>
