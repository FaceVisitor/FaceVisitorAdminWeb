<template>
  <div v-if="goods" class="animated fadeIn" style="margin-top:30px;">
    <b-row>
      <b-col sm="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>상품 디테일</strong>
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
              <label>제조사</label>
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
              <label>세일 가격</label>
              <b-form-input id="name" v-model="goods.salePrice" type="text" />
            </b-form-group>
          </b-col>


          <b-col sm="8">
            <b-form-group label="매장 이미지" label-for="thumbnail">
              <MyUpload :images="goods.images" @delete="handleDelete" @upload="handleUpload" />
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
              <b-button variant="primary" @click="updateGoods">수정</b-button>
              <b-button variant="danger" @click="deleteGoods">삭제</b-button>
            </div>
          </b-col>

        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import axios from '../../utils/axios'
import MyUpload from '../../components/me/MyUpload'
import { MessageBox } from 'element-ui'

export default {
  name: 'GoodsDetail',
  components: {
    MyUpload
  },
  data() {
    return {
      goodsId: null,
      goods: null,
      dialogImageUrl: '',
      dialogVisible: false,
      storeList : [],
      categoryList : [],
    }
  },
  computed: {},
  async created() {
    try {

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


      this.goodsId = this.$route.params.id
      const { data } = await axios.get('/owner/goods/' + this.goodsId)
      data.store = data.store.id;
      data.category = data.category.id
      this.goods = data

    }catch (e) {
      MessageBox.alert('에러발생', {
        type: 'error',
        confirmButtonText: '확인'
      })
      console.log(e);
    }



    console.log(this.goods)
  },
  mounted() {

  },
  methods: {
    updateGoods() {
      axios.put('/owner/goods/'+this.goods.id, this.goods).then(result => {
        this.$message.success('수정되었습니다.')

      }).catch(err => {
        console.log(err)
        this.$message.error(err.response.data)
      })
    },
    deleteGoods() {
      MessageBox.confirm('정말 삭제하시겠습니까?', '삭제 확인', {
        confirmButtonText: '네',
        cancelButtonText: '아니요',
        type: 'warning'
      }).then(() => {
        axios.delete('/owner/goods/' + this.goods.id).then(result => {
          this.$router.go(-1)
          MessageBox.alert('삭제되었습니다.', {
            type: 'success',
            confirmButtonText: '확인'
          })
        }).catch(err => {
          console.log(err)
          MessageBox.alert('삭제에 실패했습니다', {
            type: 'error',
            confirmButtonText: '확인'
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },

    handleDelete(file) {
      console.log(file)
      axios.post('/owner/goods/' + this.goodsId + '/image/delete', file).catch(err => {
        console.log(err)
      })
    },
    handleUpload(file) {
      axios.post('/owner/goods/' + this.goodsId + '/image', file).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<style scoped>
  input {
    margin-top: 16px;
  }
</style>
