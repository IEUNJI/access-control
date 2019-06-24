<template>
  <div class="login">
    <input type="text" placeholder="用户名" v-model="user.username">
    <input type="text" placeholder="密码" v-model="user.password">
    <button @click="toLoginOrReg('login')">登录</button>
    <button @click="toLoginOrReg('reg')">注册</button>
  </div>
</template>

<script>
// 导入 登录 及 注册 的 api
import { login, reg } from '../api/api.js'
// 导入处理登录细节的方法
import { handleLogin } from '../assets/utils.js'
export default {
  data() {
    return {
      user: { username: '', password: '' }
    }
  },
  methods: {
    // type 为 'login' 或 'reg'
    // 根据 type 从 handlers 中调用不同的处理函数
    async toLoginOrReg(type) {
      const handlers = { login, reg }
      const res = await handlers[type](this.user)
      // 请求异常, 弹出后端返回的错误信息
      if (res.code === 1) return alert(res.msg)
      // 从返回结果中解构出 menus permissions token
      const { user: { menus, permissions }, token } = res
      // 调用处理登录细节的方法
      handleLogin(menus, permissions, token)
      // 跳转至首页 (path: '/')
      this.$router.push('/')
    }
  }
}
</script>
