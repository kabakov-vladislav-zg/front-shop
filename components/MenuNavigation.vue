<template>
  <div
    class="navigation navbar-dark"
    @click="onclick($event)"
  >
    <ul class="menu__categories navbar-nav border-bottom">
      <li
        v-for="category in catalog"
        :key="category.attributes.slug"
      >
        <nuxt-link
          :to="'/catalog/' + category.attributes.slug"
          class="nav-link"
        >
          {{category.attributes.title}}
        </nuxt-link>
      </li>
    </ul>
    <ul class="navbar-nav border-bottom">
        <li>
          <nuxt-link
            to="/account"
            class="nav-link"
          >
            My account
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/blog"
            class="nav-link"
          >
            Blog
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/delivery"
            class="nav-link"
          >
            Delivery
          </nuxt-link>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "MenuNavigation",

  computed: {
    catalog() {
      return this.$store.state.catalog
    }
  },

  methods: {
    onclick(e) {
      console.log(e.target.classList)
      if(e.target.classList.contains('nav-link')) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped>

</style>
