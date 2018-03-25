<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
import {MP} from '../util/map'
export default {
  name: 'bmap',
  props: {
    camerasInfo: {
      type: Array
    }
  },
  methods: {
    getMap () {
      let dataList = this.camerasInfo
      let that = this
      this.$nextTick(function () {
        MP("akvalue").then( BMap => {
          var map = new BMap.Map("container")
          var point = new BMap.Point(118.769, 32.066)
          var [x, y] = [dataList[0].pointX, dataList[0].pointY]
          var point_1 = new BMap.Point(x, y)
          var marker_1 = new BMap.Marker(point_1)
          map.centerAndZoom(point,15)
          map.centerAndZoom(point_1, 15)
          map.setMapStyle({style:'light'})
          map.addOverlay(marker_1)
          marker_1.addEventListener("click", function(){
            that.$router.push('/cameras/1/video')
          })
          // var opts_1 = {
          //   width: 250,
          //   height: 50,
          //   title: dataList[0].name
          // }
          // var infoWindow_1 = new BMap.InfoWindow("", opts_1)
          // map.openInfoWindow(infoWindow_1, map.getCenter())
        })
      })
    }
  },
  mounted () {
    this.getMap()
  }
}
</script>
<style>   
  #container{width: 100vw; height: 100vh;}
</style>
