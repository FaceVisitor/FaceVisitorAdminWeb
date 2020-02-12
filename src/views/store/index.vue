<template>
  <div class="app-container ">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
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

      <el-table-column width="300px" label="가게명">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" label="전화번호">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" label="영업시간">
        <template slot-scope="{row}">
          <span>{{ row.openTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <router-link :to="`/store/${row.id}`">
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
      <router-link to="/store/create">
        <el-button type="primary" size="big" style="width: 250px; height: 80px; font-size: 18px;">매장 추가하기 </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import axios from '../../utils/axios'

export default {
  name: 'StoreTable',
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
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await axios.get('/owner/store')
      console.log(data)
      this.list = data
      // this.list = items.map(v => {
      //   this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
      //   v.originalTitle = v.title //  will be used when user click the cancel botton
      //   return v
      // })
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
