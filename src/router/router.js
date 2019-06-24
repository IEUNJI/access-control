import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Vue 初始化时只存在两个路由, 登录页与 404 页
// 待用户登录成功, 得到该用户的权限信息后, 再通过 router.addRoutes 方法动态添加路由
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/404',
      name: '404页',
      component: () => import('../views/404.vue')
    }
  ]
})
