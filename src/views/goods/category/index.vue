<template>
  <div class="app-container " style="width: 960px; margin : 0 auto">
    <el-table v-loading="listLoading" v-if="list && list._embedded" :data="list._embedded.goodsCategories" border highlight-current-row >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="생성일">
        <template slot-scope="{row}">
          <span>{{ row.createdAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" label="상품명">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <router-link :to="`/goods/category/${row.id}`">
            <el-button
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
            >
              상세보기
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="text-center m-3">
      <router-link to="/goods/category/create">
        <el-button type="primary" size="big" style="width: 200px; height: 60px; font-size: 18px;">상품 카테고리 추가하기 </el-button>
      </router-link>
    </div>

<!--    <BootPagination :total-pages="page.page.totalPages"></BootPagination>-->

  </div>
</template>

<script>
import axios from '../../../utils/axios'

export default {
  name: 'GoodsCategoryTable',
  components: {},
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await axios.get('/owner/goods/category')
      this.list = data
      console.log(data);
      this.listLoading = false
    }
  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
