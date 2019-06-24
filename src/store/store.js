import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: {}, // 路由权限信息
    permissions: {} // ajax 请求权限信息
  },
  mutations: {
    setMenus(state, options) {
      state.menus = options
    },
    setPermissions(state, options) {
      state.permissions = options
    }
  }
})
