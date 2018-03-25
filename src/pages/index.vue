<template>
    <div>
      <Bmap :camerasInfo="camerasInfo"></Bmap>
    </div>
</template>
<script>
import Bmap from '../components/Bmap'
import { getAllCameras } from '../api/api'
export default {
  data () {
    return {
      camerasInfo: []
    }
  },
  components: {
    'Bmap': Bmap
  },
  mounted () {
    getAllCameras().then((res) => {
      res.data.map((item) => {
        this.camerasInfo.push(item)
      })
    })
  }
}
</script>
<style>
</style>
