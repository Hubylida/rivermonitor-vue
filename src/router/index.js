import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import sideBar from '../layout/sideBar.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/cameras/:id',
      name: 'cameras',
      component: sideBar,
      redirect: '/cameras/:id/video',
      children: [{
        path: 'video',
        name: 'video',
        component: () => import('../pages/video.vue'),
        meta: { title: 'video' }
      },{
        path: 'photo',
        name: 'photo',
        component: () => import('../pages/photo.vue'),
        meta: { title: 'photo' }
      }]
    },
    {
      path: '/setting',
      name: 'setting',
      component: sideBar,
      redirect: '/setting/index',
      children: [{
        path: 'index',
        name: 'settingIndex',
        component: () => import('../pages/setting.vue'),
        meta: { title: 'setting' }
      }]
    }
  ]
})
