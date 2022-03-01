<template>
  <header class="the-header navbar navbar-dark bg-dark p-0">
    <div class="container-fluid">
      <nuxt-link class="navbar-brand" to="/">Shop</nuxt-link>

      <div
        v-if="isDesktop"
        class="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <template v-for="component in components">
          <input
            v-model="currentComponent"
            :key="component.name"
            :value="component.name"
            type="radio"
            class="btn-check"
            name="the-header__toolbar"
            :id="'the-header__toolbar_' + component.name"
            autocomplete="off"
          >
          <label
            class="btn btn-dark btn-ico"
            :class="component.buttonClassList"
            :for="'the-header__toolbar_' + component.name"
          ></label>
        </template>
      </div>

      <div
        v-else
        class="btn-group"
        role="group"
        aria-label="Basic example"
      >
        <button
          v-for="component in components"
          @click="openTool(component.name)"
          type="button"
          class="btn btn-dark btn-ico w-100 p-1"
          :class="component.buttonClassList"
        ></button>
      </div>
    </div>
    <div
      v-if="isDesktop"
      class="container-fluid"
    >
      <keep-alive>
        <component :is="component"/>
      </keep-alive>
    </div>
  </header>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TheHeader",
  components: {},

  data() {
    return {
      components: [
        {
          name: 'MenuNavigation',
          buttonClassList: 'btn-ico_burger'
        },
        {
          name: 'MenuFavorite',
          buttonClassList: 'btn-ico_favorite'
        },
        {
          name: 'MenuCart',
          buttonClassList: 'btn-ico_cart'
        },
      ],
      currentComponent: 'MenuNavigation'
    }
  },

  computed: {
    ...mapGetters({
      isDesktop: 'screen/isDesktop',
    }),

    component() {
      let link = this.currentComponent
      return () => import(`./${link}`)
    }
  },

  methods: {
    ...mapActions({
      openTool: 'openTool'
    })
  }
}
</script>

<style>
.the-header {
  display: block;
}
</style>
