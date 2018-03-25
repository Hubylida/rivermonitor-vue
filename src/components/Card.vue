<template>
  <div>
    <div class="setting-item">
      <span :style="nameDisplay">{{name}}</span>
      <el-input class="input" size="mini" type="text" name="name" v-model="name" :style="display" :disabled="is_change"></el-input>
      <p>
        <span>厂家型号: </span>
        <el-input class="input" size="mini" type="text" name="info" v-model="info" :disabled="is_change"></el-input>
      </p>
      <p>
        <span>物理地址: </span>
        <el-input class="input" size="mini" type="text" name="mac" v-model="mac" :disabled="is_change"></el-input>
      </p>
      <p>
        <span>视频链接地址: </span>
        <el-input class="input" size="mini" type="text" name="video_url" v-model="video_url" :disabled="is_change"></el-input>
      </p>
      <el-button @click="changeHandle" size="small" class="change" type="primary" :disabled="changeDisabled">修改</el-button>
      <el-button @click="saveHandle" size="small" class="save" type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
import { updateCameraInfo } from '../api/api'
export default {
  name: 'card',
  data () {
    return {
      is_change: true,
      name: this.item.name,
      info: this.item.info,
      mac: this.item.mac,
      video_url: this.item.video_url,
      changeDisabled: false
    }
  },
  props: ['item'],
  computed: {
    display () {
      return this.is_change ? 'display: none' : ''
    },
    nameDisplay () {
      return this.is_change ? '' : 'display: none'
    }
  },
  methods: {
    changeHandle () {
      this.is_change = false
      this.changeDisabled = true
    },
    saveHandle () {
      this.is_change = true
      this.changeDisabled = false
      let data = {
        camera_id: this.item.camera_id,
        name: this.name,
        info: this.info,
        mac: this.mac,
        video_url: this.video_url
      }
      updateCameraInfo(data).catch(error => console.error(error))
    }
  }
}
</script>
<style scoped>
.setting-item {
  background: #fff;
  padding: 1em 1.5em;
  border-radius: 10px;
  margin: 1em;
  box-shadow: 0 0 10px rgba(0, 0, 0, .15), 0 3px 3px rgba(0, 0, 0, .15);
}

.input {
  width: 12em;
}

.save,
.change {
  margin-right: 1em;
}
</style>
