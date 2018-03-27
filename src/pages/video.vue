<template>
  <div class="video-contain">
    <div class="video-wrap">
      <video-player class="vjs-custom-skin video-item" :options="playerOptions" @ready="playerReadied"></video-player>
      <div class="video-info">
        <div class="video-info-wrap">
          <p>摄像头名字: {{video.name}}</p>
          <p>地点: {{video.location}}</p>
          <p>时间: {{video.time}}</p>
          <p>当前水位: <span>{{video.depth}}</span></p>
        </div>
      </div>
    </div>
    <div class="chart-wrap">
      <div id="myChart" class="chart"></div>
    </div>
  </div>
</template>
<script>
import videojs from 'video.js'
window.videojs = videojs
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import { getVideoUrl, getAllDepth, getCurrentDepth } from '../api/api'

export default {
  components :{
    'video-player': videoPlayer
  },
  data() {
    return {
      playerOptions: {},
      video: {},
      timeList: [],
      depthList: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.getData()
      setTimeout(() => {
        this.drawLine()
      }, 100)
    }
  },
  methods: {
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      player.tech_.hls.xhr.beforeRequest = function(options) {
        return options
      }
    },
    getVideoUrl () {
      let fullPath = this.$route.path
      let id = fullPath.split('/')[2]
      getVideoUrl(id).then((res) => {
        this.playerOptions = {
          height: '440',
          sources: [{
            withCredentials: false,
            type: 'application/x-mpegURL',
            src: res.data[0].video_url
          }],
          controlBar: {
            timeDivider: true,
            durationDisplay: true
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg'
        }
      })
    },
    getData () {
      let fullPath = this.$route.path
      let id = fullPath.split('/')[2]
      let that = this
      let lastId = 0
      let [timeList, depthList] = [[], []]
      getAllDepth(id).then((res) => {
        res.data.map((item, index) => {
          timeList.push(item.time.substring(0, 10))
          depthList.push(item.depth)
          lastId++
        })
        that.timeList = timeList
        that.depthList = depthList
        that.video = res.data[lastId - 1]
        that.video.time = that.video.time.substring(0, 10)
      })
    },
    drawLine () {
      let echarts = require('echarts/lib/echarts')
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: { text: '历史水位' },
        tooltip: {},
        xAxis: {
          data: this.timeList
        },
        yAxis: {},
        series: [{
          name: '水位',
          type: 'line',
          data: this.depthList,
          areaStyle: {}
        }]
      })
      myChart.getOption()
    }
  },
  mounted () {
    let fullPath = this.$route.path
    let id = fullPath.split('/')[2]
    let that = this
    this.getVideoUrl()
    this.getData()
    setTimeout(() => {
      this.drawLine()
    }, 100)
    setInterval(() => {
      getCurrentDepth(id).then((res) => {
        that.video = res.data[0]
        that.video.time = that.video.time.substring(0, 10)
      })
    }, 5000)
  }
}
</script>
<style>
.video-contain {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.video-wrap {
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin: 2em;
}
.video-item {
  flex: 1;
  margin-right: 2em;
}
.video-info {
  flex: 1;
  padding: 2em;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
}

.video-info-wrap * {
  font-size: 1.2em;
  margin: 1.2em 0;
}
.video-info-wrap > p:last-child > span {
  color: #409EFF;
}
.chart-wrap {
  width: 1050px;
  height: 340px;
  background: #fff;
  margin: 2em;
  padding: 1em;
}
.chart {
  width: 100%;
  height: 300px;
}
</style>
