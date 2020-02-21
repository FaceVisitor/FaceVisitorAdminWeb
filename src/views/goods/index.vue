<template>
  <div>
    <div class="app-container" v-if="page && page._embedded" style="width: 100%; margin: 0 auto">
      <el-table  v-loading="listLoading" :data="page._embedded.goodses" border
                highlight-current-row>
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

        <el-table-column width="150px" label="제조사">
          <template slot-scope="{row}">
            <span>{{ row.vendor }}</span>
          </template>
        </el-table-column>

        <el-table-column width="200px" label="본 가격">
          <template slot-scope="{row}">
            <span>{{ row.price }}</span>
          </template>
        </el-table-column>

        <el-table-column width="200px" label="세일 가격">
          <template slot-scope="{row}">
            <span>{{ row.salePrice }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="{row}">
            <router-link :to="`/goods/${row.id}`">
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


      <BootPagination :total-pages="page.page.totalPages" @selectPage="selectPage"></BootPagination>

    </div>

    <div class="text-center m-3">
      <router-link to="/goods/create">
        <el-button type="primary" size="big" style="width: 200px; height: 60px; font-size: 18px;">상품 추가하기</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {fetchList} from '@/api/article'
  import axios from '../../utils/axios'
  import BootPagination from "../../components/BootStrap/BootPagination";

  export default {
    name: 'GoodsTable',
    components: {BootPagination},
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
        page: null,
        listLoading: true,
        pageParams: {
          page: 0,
          size: 20,
          searchQuery: '',
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const {data} = await axios.get('/owner/goods', {params : this.pageParams})
        console.log(data);
        this.page = data
        this.listLoading = false
      },
      selectPage(page) {
        this.pageParams.page = page;
        this.getList();
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
