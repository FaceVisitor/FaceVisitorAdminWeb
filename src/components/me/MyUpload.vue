<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="serverUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="successUpload"
      :file-list="images"
      :headers="headersInfo"
      list-type="picture-card"
    />
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>

import { getAccessToken } from '../../utils/token'

export default {
  name: 'MyUpload',
  props: ['images'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      serverUrl: process.env.VUE_APP_BASE_URL + '/file',
      headersInfo: { 'Authorization': 'Bearer ' + getAccessToken() }
    }
  },
  computed: {},

  mounted() {

  },
  methods: {
    successUpload(res, file) {
      this.$emit('upload', { name: file.name, url: file.response })
    },

    handleRemove(file, fileList) {
      const url = (file.url != null) ? file.url : file.response
      this.$emit('delete', { name: file.name, url: url })
    },

    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }

}
</script>

