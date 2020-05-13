<template>
  <div class="user_container">
    <span>상점 선택</span>
    <b-form-select v-model="selectedStoreId">
      <b-form-select-option :value="store.id" v-for="store of stores">{{store.name}}</b-form-select-option>
    </b-form-select>

    <div style="margin-top: 16px; font-weight: bold;">
      <h3>유저 리스트</h3>
    </div>
    <div>
      <el-table :data="userList" border fit highlight-current-row v-if="userList.length>0" v-loading="listLoading">
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

        <el-table-column label="가게명" width="300px">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="{row}">
            <router-link :to="`/user/${row.id}`">
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
    name: "UserList",
    data() {
      return {
        stores: null,
        selectedStoreId: null,
        listLoading: true,
        userList: [],
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
        const userResponse = await axios.get('/owner/manage/user?storeId=' + val);
        this.userList = userResponse.data;
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
