<template>
  <div class="animated fadeIn" style="margin-top:30px;">
    <b-row>
      <b-col sm="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>상품 카테고리 생성</strong>
            <small>Form</small>
          </div>
          <b-col sm="8">
            <b-form-group>
              <label>카테고리 명</label>
              <b-form-input id="name" v-model="category.name" type="text" />
            </b-form-group>
          </b-col>

          <b-col align-self="end">
            <div slot="footer">
              <b-button variant="primary" @click="createGoodsCategory">등록</b-button>
            </div>
          </b-col>

        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>

import axios from '../../../utils/axios'

export default {
  name: 'GoodsCategoryCreate',
  components: {

  },
  data() {
    return {
      category : {
        name: '',
      }
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    createGoodsCategory() {
      axios.post('/owner/goods/category', this.category).then(result => {
        console.log(result)
        this.$message.success('생성되었습니다.')
        this.category.name = '';
      }).catch(err => {
        console.log(err)
        this.$message.error(err.response.data)
      })
    },
  }

}
</script>

<style scoped>
  input {
    margin-top: 16px;
  }
</style>
