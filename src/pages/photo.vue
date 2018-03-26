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
import { getPhotoHandle } from '../api/api.js'
export default {
  name: 'photo',
  data () {
    return {
      allPhotos: [],
      photos: [],
      total: 0
    }
  },
  watch: {
    '$route' (to, from) {
      this.getPhoto()
    }
  },
  methods: {
    currentPage (res) {
      this.photos = this.allPhotos.slice(( res - 1) * 12, res * 12)
    },
    getPhoto () {
      let fullPath = this.$route.path
      let id = fullPath.split('/')[2]
      let that = this
      getPhotoHandle(id).then((res) => {
        let data = res.data
        that.allPhotos = []
        data.map((item) => {
          that.allPhotos.push(item)
        })
        that.total = that.allPhotos.length
        that.photos = that.allPhotos.slice(0, 12)
      })
    }
  },
  mounted () {
    this.getPhoto()
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
