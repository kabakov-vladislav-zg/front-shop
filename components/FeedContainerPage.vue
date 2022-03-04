<template>
  <div
    ref="page"
    class="page row row-cols-3 g-3"
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
    },
    page: {
      type: Number,
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
    this.$refs.page.page = this.page
    this.$nextTick(() =>{
      this.$emit('init', this.$refs.page)
      if (this.top && (this.position === window.pageYOffset)) {
        window.scrollBy(0, this.$refs.page.getBoundingClientRect().height)
      }
    })
  }
}
</script>
