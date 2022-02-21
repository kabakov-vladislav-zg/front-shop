<template>
  <main>
    <TheFilter />
    <NuxtChild />
  </main>
</template>

<script>
import TheFilter from "../components/TheFilter";
export default {
  name: "Catalog",
  components: {TheFilter}
}
</script>
