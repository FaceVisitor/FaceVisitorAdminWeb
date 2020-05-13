<template>
  <div class="animated fadeIn" style="margin-top:30px;" v-if="user">
    <b-row>
      <b-col offset="1" sm="10">
        <b-card>
          <div slot="header">
            <strong>유저 디테일</strong>
            <small>Form</small>
          </div>
          <b-col sm="8">
            <b-form-group>
              <label>이름</label>
              <b-form-input id="name" readonly type="text" v-model="user.name"/>
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group>
              <label>이메일</label>
              <b-form-input id="name" readonly type="text" v-model="user.email"/>
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group label="핸드폰번호">
              <b-form-input id="name" readonly type="text" v-model="user.phone"/>
            </b-form-group>
          </b-col>

          <b-col sm="8">
            <b-form-group label="포인트">
              <b-form-input id="name" readonly type="text" v-model="user.point"/>
            </b-form-group>
          </b-col>


          <b-col sm="8">
            <b-form-group label="얼굴" label-for="thumbnail">
              <div v-for="faceImage of user.faceMeta.faceImages">
                <img :src="faceImage.url" height="100" width="100">
              </div>
            </b-form-group>
          </b-col>

        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import axios from "../../utils/axios";

  export default {
    name: "UserDetail",
    data() {
      return {
        user: null,
      }
    },
    methods: {},
    computed: {},
    async created() {
      const userId = this.$route.params.id;
      const userResponse = await axios.get('/owner/manage/user/' + userId);
      this.user = userResponse.data;
      console.log(this.user);

    }

  }
</script>

<style scoped>

</style>
