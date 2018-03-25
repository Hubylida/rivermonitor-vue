<template>
  <div class="setting-contain">
    <div v-for="(item, index) in settingList" :key="index">
      <card :item="item" :index="index"></card>
    </div>
  </div>
</template>
<script>
import Card from "../components/Card"
import { getAllCameras } from '../api/api'
export default {
  name: "setting",
  layout: "sidebar",
  components: {
    card: Card
  },
  data () {
    return {
      settingList: []
    }
  },
  created () {
    getAllCameras().then((res) => {
      console.log(res)
      res.data.map((item) => {
        this.settingList.push(item)
      })
    })
  }
}
</script>
<style>
body {
  margin: 0;
}
.setting-contain {
  display: flex;
}
</style>
