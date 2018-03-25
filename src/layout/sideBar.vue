<template>
  <div class="contain">
    <el-menu
      class="el-menu-vertical-demo left"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <el-menu-item index="/">
          <i class="el-icon-location-outline"></i>
          <span class="span-item" slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-view"></i>
          <span>视频</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(item, index) in routerList" :index="`/cameras/${item.camera_id}/video`" :key="index">
            {{item.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-picture-outline"></i>
          <span>照片</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(item, index) in routerList" :index="`/cameras/${item.camera_id}/photo`" :key="index">
            {{item.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span class="span-item">设置</span>
      </el-menu-item>
    </el-menu>
    <div class="right-content">
      <div class="header">
        <span>水位监测系统</span>
      </div>
      <router-view/>
    </div>
  </div>
</template>
<script>
import { getAllCameras } from '../api/api'
export default {
  name: 'sidebar',
  data() {
    return {
      videoUrl: '',
      photoUrl: '',
      routerList: []
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    }
  },
  created() {
    let that = this
    getAllCameras().then((res) => {
      this.routerList = res.data
    })
  }
}
</script>
<style scoped>
  .contain {
    width: 100vw;
    min-height: 100vh;
    background: #f0f0f0;
    display: flex;
  }
  .left {
    flex: 1;
    background: rgb(84, 92, 100);
  }
  .header {
    background: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    padding: .7em;
    font-size: 1.3em;
  }
  .nav-content{
    text-decoration: none;
    color: #fff;
  }
  .right-content {
    display: flex;
    flex: 6;
    flex-direction: column;
  }
</style>
