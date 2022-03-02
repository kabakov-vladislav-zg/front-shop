<template>
  <div
    class="layout"
    :style="root"
  >
    <transition name="layout__header_transition">
      <HeaderMain
        class="layout__header"
        v-show="isToTop || isDesktop"
      />
    </transition>

    <transition name="layout__feed-toolbar_transition">
      <FeedToolbar
        class="layout__feed-toolbar"
        v-show="(isCatalog || isBlog) && isToTop"
      />
    </transition>

    <div class="layout__content">
      <Nuxt />
    </div>

    <ModalBackdrop v-if="isToolsOpen" />
    <transition>
      <ModalContainer v-show="isToolsOpen" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FeedToolbar from "../components/FeedToolbar";
import HeaderMain from "../components/HeaderMain";
import ModalBackdrop from "../components/ModalBackdrop";
import ModalContainer from "../components/ModalContainer";
export default {
  name: "default",
  components: {
    ModalContainer,
    ModalBackdrop,
    HeaderMain,
    FeedToolbar,
  },

  computed: {
    isCatalog() {
      return 'category' in this.$route.params
    },
    isBlog() {
      return 'blog' in this.$route.params
    },

    root() {
      let root = {}
      if (this.clientHeight) root['--vh'] = this.clientHeight / 100 + 'px'
      return root
    },

    ...mapGetters({
      isDesktop: 'screen/isDesktop',
      isTablet: 'screen/isTablet',
      isMobile: 'screen/isMobile',
      isToTop: 'scroll/isToTop',
      isToolsOpen: 'isToolsOpen',
      clientHeight: 'screen/getClientHeight'
    })
  }
}
</script>


<style lang="scss">
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

.layout__content {
  margin-top: $header-topbar-height;

  @media (min-width: 992px) {
    margin-top: 0;
    padding-left: $header-sidebar-width;
  }
}

.layout__header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: $zindex-fixed;

  @media (min-width: 992px) {
    width: $header-sidebar-width;
    height: calc(var(--vh, 1vh) * 100);
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

.layout__feed-toolbar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;

  &_transition {
    &-enter, &-leave-to {
      transform: translateY(100%);
    }
    &-enter-active, &-leave-active {
      transition: transform .25s;
    }
  }

  @media (min-width: 992px) {
    left: 50%;
  }
}
</style>
