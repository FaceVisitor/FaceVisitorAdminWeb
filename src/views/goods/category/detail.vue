<template>
  <div v-if="category" class="animated fadeIn" style="margin-top:30px;">
    <b-row>
      <b-col sm="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>상품 카테고리 디테일</strong>
            <small>Form</small>
          </div>
          <b-col sm="8">
            <b-form-group>
              <label>카테고리 명</label>
              <b-form-input id="name" v-model="category.name" type="text" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group>
              <label>활성화</label>
              <b-form-checkbox v-model="category.active" type="text" />
            </b-form-group>
          </b-col>


          <b-col align-self="end">
            <div slot="footer">
              <b-button variant="primary" @click="updateGoodsCategory">수정</b-button>
              <b-button variant="danger" @click="deleteGoodsCategory">삭제</b-button>
            </div>
          </b-col>

        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import axios from '../../../utils/axios'
import MyUpload from '../../../components/me/MyUpload'
import { MessageBox } from 'element-ui'

export default {
  name: 'GoodsCategoryDetail',
  components: {
    MyUpload
  },
  data() {
    return {
      categoryId: null,
      category: null,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {},
  async created() {
    this.categoryId = this.$route.params.id
    const { data } = await axios.get('/owner/goods/category/' + this.categoryId)
    this.category = data
    console.log(this.category)
  },
  mounted() {

  },
  methods: {
    updateGoodsCategory() {
      axios.put('/owner/goods/category/'+this.category.id, this.category).then(result => {
        this.$message.success('수정되었습니다.')

      }).catch(err => {
        console.log(err)
        this.$message.error(err.response.data)
      })
    },
    deleteGoodsCategory() {
      MessageBox.confirm('정말 삭제하시겠습니까?', '삭제 확인', {
        confirmButtonText: '네',
        cancelButtonText: '아니요',
        type: 'warning'
      }).then(() => {
        axios.delete('/owner/goods/category/' + this.category.id).then(result => {
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
  }

}
</script>

<style scoped>
  input {
    margin-top: 16px;
  }
</style>
