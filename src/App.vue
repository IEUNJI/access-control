<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// 导入 token 校验 api
import { check } from './api/api.js'
// 导入 sessionStorage 存取, 处理登录, 登出细节的方法
import { session, handleLogin, handleLogout } from './assets/utils.js'
export default {
  async created() {
    // 从本地读取 token
    const token = session('token')
    // token 不存在, 跳转至登录页
    if (!token) return this.$router.push('/login')
    // token 存在, 校验 token 的合法性
    const res = await check(token)
    switch (res.code) {
      // res.code 为 0, 校验成功
      case 0:
        // 从后台返回的 decode (即 token 中存储的用户信息) 中
        // 解构出 路由权限信息 及 ajax 接口调用权限信息
        const { menus, permissions } = res.decode.user
        // 执行登录操作
        handleLogin(menus, permissions)
        // 如果该用户的访问目标页面为登录页, 则跳转至首页
        if (this.$router.currentRoute.fullPath === '/login') this.$router.push('/')
        break
      // res.code 为 1, 校验失败
      case 1:
        // 执行登出操作
        handleLogout()
        break
    }
  }
}
</script>
