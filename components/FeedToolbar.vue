<template>
  <aside class="feed-toolbar bg-dark">
    <FeedToolbarPagination class="feed-toolbar__pagination" />
    <FeedToolbarSelectorSort class="ms-2" />
    <button
      @click="openTool('MenuFilter')"
      class="btn btn-ico btn-dark btn-ico_filter p-1 ms-2"
    >
      <span class="d-none d-md-inline">Фильтер</span>
    </button>
  </aside>
</template>

<script>
import {mapActions} from "vuex";
import FeedToolbarSelectorSort from "./FeedToolbarSelectorSort";
import FeedToolbarPagination from "./FeedToolbarPagination";

export default {
  name: "FeedToolbar",
  components: {FeedToolbarPagination, FeedToolbarSelectorSort},
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
  padding-right: .75rem;
}
.feed-toolbar__pagination {
  flex-grow: 1;
}
</style>
