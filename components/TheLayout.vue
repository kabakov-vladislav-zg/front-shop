<template>
  <div class="the-layout">
    <TheLayoutHeader />
    <div class="the-layout__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheLayoutHeader from "./TheLayoutHeader";
export default {
name: "TheLayout",
  components: {TheLayoutHeader}
}
</script>

<style scoped lang="scss">
.the-layout__content {
  margin-top: $header-topbar-height;

  @media (min-width: 992px) {
    margin-top: 0;
    margin-left: $header-sidebar-width;
  }
}
</style>
