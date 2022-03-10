<template>
  <div class="qualities">
    <template v-for="(quality, key) in allQualities">
      <h3 class="text-light">
        {{ quality.title }}
      </h3>
      <select
        :key="key"
        @input="setQualities(key, $event.target.value)"
        class="form-select"
        aria-label="Default select example"
      >
        <option
          v-for="(option, value) in quality.value"
          :value="value"
          :selected="isSelected(key, value)"
        >
          {{ option }}
        </option>
      </select>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuFilterQualities",
  props: ['value'],

  methods: {
    isSelected(key, value) {
      return this.qualities && this.qualities[key] === value
    },
    setQualities(key, value) {
      let qualities = JSON.parse(JSON.stringify(this.qualities || {}))
      if(value === 'null') {
        delete qualities[key]
      } else {
        qualities[key] = value
      }
      this.$emit('input', qualities)
    }
  },

  computed: {
    qualities() {
      return this.value
    },
    allQualities() {
      return this.$store.state.feed.allQualities
    }
  }
}
</script>

<style lang="scss">

</style>
