<template>
  <div class="user_container">
    <span>상점 선택</span>
    <b-form-select v-model="selectedStoreId">
      <b-form-select-option :value="store.id" v-for="store of stores">{{store.name}}</b-form-select-option>
    </b-form-select>

    <div style="margin-top: 16px; font-weight: bold;">
      총 수익 : {{response.totalPrice}}원
    </div>
    <div style="margin-top: 16px; font-weight: bold;">
      <h3>주문 리스트</h3>
    </div>

    <div v-if="response.orders">
      <el-table :data="response.orders" border fit highlight-current-row v-if="response.orders.length>0"
                v-loading="listLoading">
        <el-table-column align="center" label="ID" width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="생성일" width="180px">
          <template slot-scope="{row}">
            <span>{{ row.createdAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>


        <el-table-column align="center" label="상품들" width="180px">
          <template slot-scope="{row}">
            <span>{{row.lineItems.map(result=>result.goodsName)}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="결제가격" width="180px">
          <template slot-scope="{row}">
            <span>{{row.payPrice}}</span>
          </template>
        </el-table-column>


        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="{row}">
            <router-link :to="`/order/${row.id}`">
              <el-button
                icon="el-icon-circle-check-outline"
                size="small"
                type="success"
              >
                상세보기
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import axios from "../../utils/axios";

  export default {
    name: "OrderList",
    data() {
      return {
        stores: null,
        selectedStoreId: null,
        listLoading: true,
        response: [],
      }
    },
    async created() {
      const storeResponse = await axios.get('/owner/store')
      this.stores = storeResponse.data._embedded.stores;

      this.listLoading = false
    },

    methods: {},
    watch: {
      async selectedStoreId(val) {
        const orderResponse = await axios.get('/owner/manage/order?storeId=' + val);
        this.response = orderResponse.data;
        console.log(this.response)
      }
    },
    computed: {},

  }
</script>

<style scoped>
  .user_container {
    margin: 0 auto;
    max-width: 80%;

  }
</style>
