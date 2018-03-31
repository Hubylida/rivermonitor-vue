<template>
  <div class="photo-contain">
    <div class="photo-wrap">
      <div v-for="item in photos" :key="item.id">
        <img :src="item.photo_src" alt="" class="photo-img">
      </div>
    </div>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      @current-change="currentPage"
      class="pagination-item"
      >
    </el-pagination>
  </div>
</template>
<script>
import { getPhotoHandle, getAllPhotos } from '../api/api.js'
export default {
  name: 'photo',
  data () {
    return {
      photos: [],
      total: 0
    }
  },
  methods: {
    currentPage (res) {
      this.getPhoto(res)
    },
    getPhoto (pageNum) {
      let fullPath = this.$route.path
      let id = fullPath.split('/')[2]
      let that = this
      that.photos = []
      getPhotoHandle(id, pageNum).then((res) => {
        let data = res.data
        data.map((item) => {
          that.photos.push(item)
        })
      })
    },
    getAllPhotoNum () {
      let fullPath = this.$route.path
      let id = fullPath.split('/')[2]
      let that = this
      getAllPhotos(id).then((res) => {
        that.total = res.data.length
        console.log(res.data, res.data.length)
      })
    }
  },
  mounted () {
    this.getPhoto(1)
    this.getAllPhotoNum()
  }
}
</script>
<style>
  .photo-contain {
    widows: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .photo-wrap{
    max-width: calc(1280px + 8em);
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }
  .photo-img {
    width: 320px;
    margin: 1em;
  }
</style>
