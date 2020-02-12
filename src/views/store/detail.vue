<template>
  <div v-if="store" class="animated fadeIn" style="margin-top:30px;">
    <b-row>
      <b-col sm="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>가게 디테일</strong>
            <small>Form</small>
          </div>
          <b-col sm="8">
            <b-form-group>
              <label>가게명</label>
              <b-form-input id="name" v-model="store.name" type="text" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group>
              <label>전화번호</label>
              <b-form-input id="name" v-model="store.phone" type="text" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group>
              <label>영업시간</label>
              <b-form-input id="name" v-model="store.openTime" type="text" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group>
              <label>주소</label>
              <b-form-textarea
                id="textarea"
                v-model="store.address"
                rows="3"
                max-rows="6"
              />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group label="매장 이미지" label-for="thumbnail">
              <MyUpload :images="store.images" @delete="handleDelete" @upload="handleUpload" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group label="가게 소개" label-for="textarea">
              <b-form-textarea
                id="textarea"
                v-model="store.description"
                rows="3"
                max-rows="6"
              />
            </b-form-group>
          </b-col>

          <b-col align-self="end">
            <div slot="footer">
              <b-button variant="primary" @click="updateStore">수정</b-button>
              <b-button variant="danger" @click="deleteStore">삭제</b-button>
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
  name: 'StoreDetail',
  components: {
    MyUpload
  },
  data() {
    return {
      storeId: null,
      store: null,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {},
  async created() {
    this.storeId = this.$route.params.id
    const { data } = await axios.get('/owner/store/' + this.storeId)
    this.store = data
    console.log(this.store)
  },
  mounted() {

  },
  methods: {
    updateStore() {
      axios.put('/owner/store', this.store).then(result => {
        this.$message.success('수정되었습니다.')
      }).catch(err => {
        console.log(err)
        this.$message.error(err.response.data)
      })
    },
    deleteStore() {
      MessageBox.confirm('정말 삭제하시겠습니까?', '삭제 확인', {
        confirmButtonText: '네',
        cancelButtonText: '아니요',
        type: 'warning'
      }).then(() => {
        axios.delete('/owner/store/' + this.storeId).then(result => {
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
      axios.post('/owner/store/' + this.storeId + '/image/delete', file).catch(err => {
        console.log(err)
      })
    },
    handleUpload(file) {
      axios.post('/owner/store/' + this.storeId + '/image', file).catch(err => {
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
