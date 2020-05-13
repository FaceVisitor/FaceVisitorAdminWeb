<template>
  <div class="animated fadeIn" style="margin-top:30px;">
    <b-row>
      <b-col sm="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>가게 생성</strong>
            <small>Form</small>
          </div>
          <b-col sm="8">
            <b-form-group>
              <label>가게명</label>
              <b-form-input id="name" v-model="name" type="text" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group>
              <label>전화번호</label>
              <b-form-input id="name" v-model="phone" type="text" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group>
              <label>영업시간</label>
              <b-form-input id="name" type="text" v-model="openTime"/>
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group>
              <label>주소</label>
              <b-form-textarea
                id="textarea"
                v-model="address"
                rows="3"
                max-rows="6"
              />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group label="매장 이미지" label-for="thumbnail">
              <MyUpload @delete="handleDelete" @upload="handleUpload" />
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group label="가게 소개" label-for="textarea">
              <b-form-textarea
                id="textarea"
                v-model="description"
                rows="3"
                max-rows="6"
              />
            </b-form-group>
          </b-col>

          <b-col align-self="end">
            <div slot="footer">
              <b-button variant="primary" @click="createStore">등록</b-button>
            </div>
          </b-col>

        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>

  import {getAccessToken} from '../../utils/token'
  import axios from '../../utils/axios'
  import MyUpload from '../../components/me/MyUpload'

  export default {
    name: 'StoreCreate',
    components: {
      MyUpload
    },
    data() {
      return {
        name: '',
        description: '',
        phone: '',
        openTime: '',
      address: '',
      images: []
    }
  },
  computed: {},
  mounted() {
    console.log(getAccessToken())
  },
  methods: {
    createStore() {
      const store = {
        name: this.name,
        description: this.description,
        phone: this.phone,
        openTime: this.openTime,
        address: this.address,
        images: this.images
      }
      axios.post('/owner/store', store).then(result => {
        console.log(result)
        this.$message.success('생성되었습니다.')
      }).catch(err => {
        console.log(err)
        this.$message.error(err.response.data)
      })
    },
    handleUpload(file) {
      this.images.push(file)
    },
    handleDelete(file) {
      const index = this.images.findIndex(image => {
        return image.url === file.url
      })
      if (index !== -1) {
        this.images.splice(index, 1)
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
