<template>
  <aside class="filter bg-dark text-light p-1">
    <button
      class="filter__btn filter__btn_filter btn text-light d-flex align-items-center"
    >
      Фильтер
    </button>
    <button
      class="filter__btn filter__btn_sort btn text-light d-flex align-items-center"
    >
      По цене
    </button>
  </aside>
</template>

<script>
export default {
name: "TheLayoutFilter"
}
</script>

<style scoped lang="scss">
.filter__btn {
  line-height: 0;
  &::before {
    margin-right: 1rem;
  }
  &_filter::before {
    content: url("data:image/svg+xml,%3Csvg width='20' height='19' viewBox='0 0 20 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3.125H1.875M20 3.125H6.875' stroke='white'/%3E%3Cpath d='M0 15.625H6.875M20 15.625H11.875' stroke='white'/%3E%3Cpath d='M0 9.375H13.125M20 9.375H19.09H18.125' stroke='white'/%3E%3Ccircle cx='15.625' cy='9.375' r='2.625' stroke='white'/%3E%3Ccircle cx='4.375' cy='3.125' r='2.625' stroke='white'/%3E%3Ccircle cx='9.375' cy='15.625' r='2.625' stroke='white'/%3E%3C/svg%3E%0A");

  }
  &_sort::before {
    content: url("data:image/svg+xml,%3Csvg width='20' height='19' viewBox='0 0 20 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3.125H1.875M20 3.125H6.875' stroke='white'/%3E%3Cpath d='M0 15.625H6.875M20 15.625H11.875' stroke='white'/%3E%3Cpath d='M0 9.375H13.125M20 9.375H19.09H18.125' stroke='white'/%3E%3Ccircle cx='15.625' cy='9.375' r='2.625' stroke='white'/%3E%3Ccircle cx='4.375' cy='3.125' r='2.625' stroke='white'/%3E%3Ccircle cx='9.375' cy='15.625' r='2.625' stroke='white'/%3E%3C/svg%3E%0A");

  }
}
</style>
