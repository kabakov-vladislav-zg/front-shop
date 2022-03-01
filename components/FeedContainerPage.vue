<template>
  <div
    ref="page"
    class="page"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FeedContainerPage",

  props: {
    top: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      position: 0
    }
  },

  beforeMount() {
    this.position = window.pageYOffset
  },
  mounted() {
    this.$nextTick(() =>{
      if (this.top && (this.position === window.pageYOffset)) {
        window.scrollBy(0, this.$refs.page.getBoundingClientRect().height)
      }
    })
  },

  beforeDestroy() {
    this.position = window.pageYOffset
  },
  destroyed() {
    this.$nextTick(() =>{
      if (this.top && (this.position === window.pageYOffset)) {
        window.scrollBy(0, -this.$refs.page.getBoundingClientRect().height)
      }
    })
  },
}
</script>
