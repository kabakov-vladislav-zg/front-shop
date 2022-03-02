<template>
  <div
    class="show modal-backdrop"
    @click="closeTool"
  ></div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ModalBackdrop",

  methods: {
    ...mapActions({
      closeTool: 'closeTool'
    })
  }
}
</script>
