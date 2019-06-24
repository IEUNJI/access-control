<template>
  <div class="home">
    <button @click="logout">登出</button>
    <NavMenu />
    <router-view></router-view>
  </div>
</template>

<script>
// 导入处理登出细节的方法
import { handleLogout } from '../assets/utils.js'
// 导入菜单组件
import NavMenu from '../components/NavMenu.vue'
export default {
  methods: {
    logout() {
      handleLogout()
    }
  },
  components: {
    NavMenu
  }
}
</script>
