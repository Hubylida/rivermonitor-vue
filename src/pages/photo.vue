<template>
  <div>
    <div class="photo-contain">
      <div v-for="item in photos" :key="item.id">
        <!-- <img :src="item.url" alt="" class="photo-img"> -->
        <div class="photo-img"></div>
      </div>
    </div>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="100"
      @current-change="currentPage"
      >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'photo',
  data () {
    return {
      photos: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        },
        {
          id: 7
        },
        {
          id: 8
        },
        {
          id: 9
        },
        {
          id: 10
        },
        {
          id: 11
        }
      ]
    }
  },
  methods: {
    currentPage (res) {
      console.log(res)
    }
  }
}
</script>
<style>
  .photo-contain{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .photo-img {
    width: 300px;
    height: 300px;
    background: blueviolet;
    margin-bottom: 1em;
  }
</style>
