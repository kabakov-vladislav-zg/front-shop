<template>
  <aside class="feed-toolbar bg-dark">
    <FeedToolbarSelectorSort />
    <button
      @click="openTool('MenuFilter')"
      class="btn btn-ico btn-dark btn-ico_filter rounded-0 px-3"
    >
      <span class="d-none d-md-inline">Фильтер</span>
    </button>
  </aside>
</template>

<script>
import {mapActions} from "vuex";
import FeedToolbarSelectorSort from "./FeedToolbarSelectorSort";

export default {
  name: "FeedToolbar",
  components: {FeedToolbarSelectorSort},
  methods: {
    ...mapActions({
      openTool: 'openTool'
    })
  }
}
</script>

<style lang="scss">
.feed-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
