<template>
  <div class="card-product card">
    <div class="card-product__img-container card-img-top">
      <img
        v-if="img"
        :src="'http://localhost:1337' + img.url"
        class="card-product__img"
        alt=""
      >
    </div>
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-text">{{ description }}</p>
      <p class="card-text">{{ price }}</p>
      <nuxt-link :to="'/' + slug">{{ title }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",

  props: {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    img: {
      type: Object,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
.card-product__img-container {
  position: relative;
  padding-top: 100%;
}
.card-product__img {
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
