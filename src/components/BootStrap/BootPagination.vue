<template>
  <nav aria-label="Page navigation example" style="margin-top: 16px;">
    <ul class="pagination justify-content-center">
      <li class="page-item" v-for="index in totalPages" :class="{active : index == selectedIndex }">
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
              selectedIndex : 1,
            }
        },
        methods: {
          selectPage(index){
            this.selectedIndex = index;
            this.$emit('selectPage',index -1);
          }
        },
        computed: {},

    }
</script>

<style scoped>

</style>
