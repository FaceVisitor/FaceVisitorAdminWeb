<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" v-for="index in totalPages">
        <a class="page-link" @click="selectPage(index)">{{index}}</a>
      </li>

    </ul>
  </nav>
</template>

<script>
    export default {
        name: "BootPagination",
        props:['totalPages'],
        data() {
            return {
            }
        },
        methods: {
          selectPage(index){
            this.$emit('selectPage',index);
          }
        },
        computed: {},

    }
</script>

<style scoped>

</style>
