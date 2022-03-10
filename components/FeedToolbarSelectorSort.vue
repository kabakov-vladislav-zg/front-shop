<template>
  <label class="selector-sort">
    <select
      v-model="sort"
      class="selector-sort__select"
    >
      <option :value="'updatedAt:desc'">новое поступление</option>
      <option :value="'price:desc'">цена по убыванию</option>
      <option :value="'price'">цена по возрастанию</option>
    </select>
  </label>
</template>

<script>
export default {
  name: "FeedToolbarSelectorSort",

  computed: {
    sort: {
      get() {
        return this.$store.state.feed.sort
      },
      set(value) {
        this.$store.dispatch('feed/update', { key: 'sort', value })
      }
    }
  }
}
</script>

<style lang="scss">
.selector-sort {
  display: inline-block;
  overflow: hidden;
  width: 2.5rem;
  height: 2.5rem;
  position: relative;

  &::after {
    content: url("data:image/svg+xml,%3Csvg width='24' height='20' viewBox='0 0 24 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.79289 19.7071C7.18342 20.0976 7.81658 20.0976 8.20711 19.7071L14.5711 13.3431C14.9616 12.9526 14.9616 12.3195 14.5711 11.9289C14.1805 11.5384 13.5474 11.5384 13.1569 11.9289L7.5 17.5858L1.84315 11.9289C1.45262 11.5384 0.819456 11.5384 0.428932 11.9289C0.0384075 12.3195 0.0384075 12.9526 0.428932 13.3431L6.79289 19.7071ZM6.5 -2.87575e-08L6.5 19L8.5 19L8.5 2.87575e-08L6.5 -2.87575e-08Z' fill='white'/%3E%3Cpath d='M15.7929 0.292893C16.1834 -0.0976311 16.8166 -0.0976311 17.2071 0.292893L23.5711 6.65685C23.9616 7.04738 23.9616 7.68054 23.5711 8.07107C23.1805 8.46159 22.5474 8.46159 22.1569 8.07107L16.5 2.41421L10.8431 8.07107C10.4526 8.46159 9.81946 8.46159 9.42893 8.07107C9.03841 7.68054 9.03841 7.04738 9.42893 6.65685L15.7929 0.292893ZM15.5 20L15.5 1L17.5 1L17.5 20L15.5 20Z' fill='white'/%3E%3C/svg%3E%0A");
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: $dark;
    pointer-events: none;
    line-height: 0;
  }

  @media (min-width: 768px) {
    color: $light;
    width: auto;
    height: auto;

    &::after {
      content: none;
    }
  }
}
.selector-sort__select {
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;

  @media (min-width: 768px) {
    position: static;
  }
}
</style>
