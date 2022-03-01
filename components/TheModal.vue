<template>
  <div class="the-modal bg-dark">
    <div class="container-fluid">
      <component
        :is="component"
        @close="closeTool"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TheModal",

  computed: {
    ...mapGetters({
      tool: 'tool'
    }),

    component() {
      let link = this.tool
      return () => import(`./${link}`)
    }
  },

  methods: {
    ...mapActions({
      closeTool: 'closeTool'
    })
  }
}
</script>

<style lang="scss">
.the-modal {
  position: fixed;
  z-index: $zindex-modal;
  top: 0;
  right: 0;
  width: $header-sidebar-width;
  height: calc(var(--vh, 1vh) * 100);
}
</style>
