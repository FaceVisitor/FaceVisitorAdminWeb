<template>
  <div class="animated fadeIn" style="margin-top:30px;">
    <b-row>
      <b-col sm="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>상품 생성</strong>
            <small>Form</small>
          </div>
          <b-col sm="8">
            <b-form-group>
              <label>상품명</label>
              <b-form-input id="name" v-model="goods.name" type="text" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group label="상품 카테고리">
              <b-form-select v-model="goods.category" :options="categoryList"/>
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group label="매장">
              <b-form-select v-model="goods.store" :options="storeList"/>
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group>
              <label>상품 제조사</label>
              <b-form-input id="name" v-model="goods.vendor" type="text" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group>
              <label>가격</label>
              <b-form-input id="name" v-model="goods.price" type="text" />
            </b-form-group>
          </b-col>


          <b-col sm="8">
            <b-form-group>
              <label>세일가격</label>
              <b-form-input id="name" v-model="goods.salePrice" type="text" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group label="상품 이미지" label-for="thumbnail">
              <MyUpload @delete="handleDelete" @upload="handleUpload" />
            </b-form-group>
          </b-col>



          <b-col sm="8">
            <b-form-group label="상품 소개" label-for="textarea">
              <b-form-textarea
                id="textarea"
                v-model="goods.description"
                rows="3"
                max-rows="6"
              />
            </b-form-group>
          </b-col>

          <b-col align-self="end">
            <div slot="footer">
              <b-button variant="primary" @click="createGoods">등록</b-button>
            </div>
          </b-col>

        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>

import { getAccessToken } from '../../utils/token'
import axios from '../../utils/axios'
import MyUpload from '../../components/me/MyUpload'

export default {
  name: 'GoodsCreate',
  components: {
    MyUpload
  },
  data() {
    return {
      goods : {
        name: '',
        vendor : '',
        description: '',
        price: '',
        salePrice: '',
        images: [],
        categoryId : null,
        storeId : null,
      },
      categoryList : [],
      storeList : [],

    }
  },
  computed: {},
  async created() {
    try{
      const categoryResponse = await axios.get('/owner/goods/category');
      let categoryList= categoryResponse.data;
      if(categoryList._embedded){
        this.categoryList = categoryList._embedded.goodsCategories.map(category=>{
          return {value : category.id , text : category.name}
        });
      }

      const storeResponse = await axios.get('/owner/store');
      let storeList = storeResponse.data;
      if(storeList._embedded){
        this.storeList = storeList._embedded.stores.map(store=>{
          return {value : store.id, text :store.name}
        })
      }
    }catch (e) {
      this.$message.error(e.response.data);
    }

  },
  mounted() {
  },
  methods: {
    createGoods() {
      axios.post('/owner/goods', this.goods).then(result => {
        console.log(result)
        this.$message.success('생성되었습니다.')
      }).catch(err => {
        console.log(err)
        this.$message.error(err.response.data)
      })
    },
    handleUpload(file) {
      this.goods.images.push(file)
    },
    handleDelete(file) {
      const index = this.images.findIndex(image => {
        return image.url === file.url
      })
      if (index !== -1) {
        this.goods.images.splice(index, 1)
      }
    }
  }

}
</script>

<style scoped>
  input {
    margin-top: 16px;
  }
</style>
