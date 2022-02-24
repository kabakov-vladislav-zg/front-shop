<template>
  <div class="the-layout">
    <transition name="the-layout__header_transition">
      <TheLayoutHeader
        class="the-layout__header"
        v-show="isToTop || isDesktop"
      />
    </transition>

    <TheLayoutContent class="the-layout__content">
      <slot></slot>
    </TheLayoutContent>

    <transition name="the-layout__filter_transition">
      <TheLayoutFilter
        class="the-layout__filter"
        v-if="isCatalog && isToTop"
      />
    </transition>

    <transition name="the-layout__pagination_transition">
      <TheLayoutPagination
        class="the-layout__pagination"
        v-if="isCatalog && isToTop"
      />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import TheLayoutHeader from "./TheLayoutHeader";
import TheLayoutFilter from "./TheLayoutFilter";
import TheLayoutPagination from "./TheLayoutPagination";
import TheLayoutContent from "./TheLayoutContent";
export default {
name: "TheLayout",
  components: {TheLayoutContent, TheLayoutPagination, TheLayoutFilter, TheLayoutHeader},

  computed: {
    isCatalog() {
      return 'blog' in this.$route.params || 'category' in this.$route.params
    },
    isToTop() {
      return this.up || this.top
    },
    isDesktop() {
      return this.clientWidth >= 992
    },

    ...mapState({
      up: state => state.scroll.up,
      top: state => state.scroll.top,
      clientWidth: state => state.screen.clientWidth,
      clientHeight: state => state.screen.clientHeight,
    })
  }
}
</script>

<style scoped lang="scss">
.the-layout__content {
  margin-top: $header-topbar-height;

  @media (min-width: 992px) {
    margin-top: 0;
    padding-left: $header-sidebar-width;
  }
}

.the-layout__header {
  position: fixed;
  top: 0;
  left: 0;
  height: $header-topbar-height;
  width: 100%;
  z-index: 1000;

  @media (min-width: 992px) {
    height: 100vh;
    width: $header-sidebar-width;
  }
  @media (max-width: 991.9999px) {
    &_transition {
      &-enter, &-leave-to {
        transform: translateY(-100%);
      }
      &-enter-active, &-leave-active {
        transition: transform .25s;
      }
    }
  }
}
.the-layout__filter {
  position: fixed;
  top: 0;
  left: $header-sidebar-width;
  display: flex;

  &_transition {
    &-enter, &-leave-to {
      transform: translateY(-100%);
    }
    &-enter-active, &-leave-active {
      transition: transform .25s;
    }
  }
}
.the-layout__pagination {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 20rem;
  height: 2.5rem;

  &_transition {
    &-enter, &-leave-to {
      transform: translateY(100%);
    }
    &-enter-active, &-leave-active {
      transition: transform .25s;
    }
  }
}
</style>
