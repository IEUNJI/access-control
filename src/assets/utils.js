// getFullPath 方法: 获取全部的路由表
import { getFullPath } from '../router/fullPath.js'
import router from '../router/router.js'
import store from '../store/store.js'

// 将数组结构转换为哈希结构
// 数组结构: [ '/goods', '/customers', '/opinion' ]
// 哈希结构:
// {
//   '/goods': true,
//   '/customers': true,
//   '/opinion': true
// }
const arrayToHash = ary => {
  const hash = {}
  ary.forEach(item => hash[item] = true)
  return hash
}

// 路由过滤, 根据后端返回的当前用户的路由权限信息 (menus)
// 从全部路由表中过滤出当前用户有权限访问的路由表
const filterRoutes = menus => {
  const exactRoutes = getFullPath()
  // exactRoutes[0] 为首页 (path: '/') 路由
  // fullChildrenRoutes 为首页下的全部子路由
  const fullChildrenRoutes = exactRoutes[0].children
  // 将数组结构转换为哈希结构, 避免了大量的遍历
  menus = arrayToHash(menus)
  // exactChildrenRoutes 为当前用户有权限访问的首页下的子路由
  const exactChildrenRoutes = fullChildrenRoutes.filter(item => menus[item.path])
  // 将 exactRoutes 中首页下的全部子路由替换为当前用户有权限访问的子路由
  exactRoutes[0].children = exactChildrenRoutes
  // 最后添加 404 重定向路由
  exactRoutes.push({ path: '/*', redirect: '/404' })
  return exactRoutes
}

// sessionStorage 存取方法
// 只传 key 为读取
// 传 key 与 value 为存储
export const session = (key, value) => {
  if (!value) return sessionStorage.getItem(key)
  sessionStorage.setItem(key, value)
}

// 该方法用于处理登录细节
// menus: 当前用户的路由权限信息
// permissions: 当前用户的 ajax 请求权限信息
// token: 非必传, 传则将 token 存储至 sessionStorage
export const handleLogin = (menus, permissions, token) => {
  // 获取当前用户的路由信息
  const exactRoutes = filterRoutes(menus)
  // 将路由信息存储至 vuex, 便于菜单组件依据路由信息动态生成菜单
  store.commit('setMenus', exactRoutes)
  // 将当前用户的路由信息注册进 router 实例
  router.addRoutes(exactRoutes)
  // 将 ajax 接口权限信息存储至 vuex, 便于 axios 请求拦截时使用此数据
  store.commit('setPermissions', arrayToHash(permissions))
  // 如果 token 存在, 将 token 存储至 sessionStorage 中
  if (token) session('token', token)
}

// 处理登出细节
export const handleLogout = () => {
  sessionStorage.removeItem('token')
  // 注意! 页面必须刷新，否则会出现上次登出用户与下次登录用户路由信息混乱的问题
  location.reload()
}
