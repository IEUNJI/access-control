<template>
  <ul class="nav-menu">
    <li v-for="(item, index) of menus" :key="index">
      <!-- { path: '/goods', name: '货物管理', component: ... } -->
      <router-link :to="item.path">{{ item.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      // vuex 中的 menus 为当前用户的路由信息
      // 根据首页下的子路由 (menus[0].children) 动态生成菜单信息
      menus: this.$store.state.menus[0].children
    }
  }
}
</script>
