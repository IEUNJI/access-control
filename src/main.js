import Vue from 'vue'
import router from './router/router.js'
import store from './store/store.js'
import App from './App.vue'

// 将 has 方法挂载至 Vue 原型上
// has 方法接收一个入参: permission, 即 权限字符串, 例如: 'get,/getGoods'
Vue.prototype.has = permission => {
  // 在 vuex 中的 permissions 列表中查找此 权限字符串
  // 查不到则表示无权限, 返回 false
  if (!store.state.permissions[permission]) return false
  // 反之返回 true
  return true
}

// 自定义指令 v-has
// binding.value 为 v-has="get,/getGoods" 中的 'get,/getGoods'
// 调用 Vue 原型上的 has 方法校验权限
// 如果无权限, 执行 el.remove() 方法, 将其自身从 DOM 结构中移除
// 理论上没有调用 ajax 接口权限的按钮都会从 DOM 结构中移除
// 但为了防止漏网之鱼, 又在 axios 的请求拦截器中做了一层辅助拦截
Vue.directive('has', {
  inserted(el, binding) {
    if (!Vue.prototype.has(binding.value)) el.remove()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
