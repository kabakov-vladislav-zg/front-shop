<template>
  <div
    class="the-backdrop show modal-backdrop"
    @click="closeTool"
  ></div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "TheBackdrop",

  methods: {
    ...mapActions({
      closeTool: 'closeTool'
    })
  }
}
</script>
