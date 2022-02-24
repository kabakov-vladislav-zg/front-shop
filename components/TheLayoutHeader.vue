<template>
  <header class="header navbar py-0 py-lg-2 navbar-dark bg-dark">
    <nav class="container-fluid flex-lg-column align-items-stretch">
      <nuxt-link class="navbar-brand" to="/">Shop</nuxt-link>
      <div class="nav">
        <button
          class="btn header__tools header__tools_search"
        ></button>
        <button
          class="btn header__tools header__tools_favorite"
        ></button>
        <button
          class="btn header__tools header__tools_cart"
        ></button>
        <button
          @click="menu = !menu"
          class="btn header__tools header__tools_burger d-lg-none"
        ></button>
      </div>
      <transition>
        <div
          v-show="menu"
          class="header__menu"
        >
          <ul class="header__categories navbar-nav border-bottom">
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
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheLayoutHeader",

  data() {
    return {
      menu: false
    }
  },

  computed: {
    catalog() {
      return this.$store.state.catalog
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  display: block;
}
.header__tools {
  line-height: 0;
}
.header__tools_search::before {
  content: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 13L19 19' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z' stroke='white' stroke-width='2'/%3E%3C/svg%3E%0A");
}
.header__tools_cart::before {
  content: url("data:image/svg+xml,%3Csvg width='20' height='24' viewBox='0 0 20 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 9.59277C1 7.70716 1 6.76435 1.58579 6.17856C2.17157 5.59277 3.11438 5.59277 5 5.59277H6.93407H13.7912H14.8022C16.6878 5.59277 17.6306 5.59277 18.2164 6.17856C18.8022 6.76435 18.8022 7.70716 18.8022 9.59277V19.1312C18.8022 20.8889 18.8022 21.7678 18.2877 22.3385C18.2415 22.3898 18.1926 22.4386 18.1413 22.4849C17.5706 22.9994 16.6917 22.9994 14.9341 22.9994V22.9994H5.79121H5C3.11438 22.9994 2.17157 22.9994 1.58579 22.4136C1 21.8278 1 20.885 1 18.9994V9.59277Z' stroke='white' stroke-width='2' stroke-linejoin='round'/%3E%3Cpath d='M5.25879 5V5C5.25879 2.79086 7.04965 1 9.25879 1H10.2588C12.4679 1 14.2588 2.79086 14.2588 5V5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
}
.header__tools_favorite::before {
  content: url("data:image/svg+xml,%3Csvg width='22' height='18' viewBox='0 0 22 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.8824 9.95569L9.50214 16.3071C10.2981 17.2067 11.7019 17.2067 12.4979 16.3071L18.1176 9.95569C19.7905 8.06493 20.6596 5.6871 19.4027 3.41967C17.9505 0.799924 15.2895 0.264482 12.9771 2.02375C12.182 2.62861 11.5294 3.31934 11.2107 3.67771C11.1 3.80224 10.9 3.80224 10.7893 3.67771C10.4706 3.31934 9.81799 2.62861 9.02295 2.02375C6.71053 0.264482 4.04945 0.799924 2.59728 3.41967C1.3404 5.6871 2.20947 8.06493 3.8824 9.95569Z' stroke='white' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
}
.header__tools_burger::before {
  content: url("data:image/svg+xml,%3Csvg width='31' height='22' viewBox='0 0 31 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 1L1 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M19 11L1 11' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M30 21L0.999999 21' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
}

.header__menu {
  @media (min-width: 992px) {
    display: block!important;
    flex-grow: 1;
    overflow: auto;
  }

  @media (max-width: 991.9999px) {
    display: flex;
    position: fixed;
    top: $header-topbar-height;
    right: 0;
    left: 0;
    background: $dark;
    padding: .75rem;
  }
}
.header__categories {
  @media (max-width: 991.9999px) {
    display: block;
    column-count: 4;
    flex-grow: 1;
  }
}
</style>
