import axios from 'axios'
import store from '../store/store.js'

// server.js 默认端口为 8888
axios.defaults.baseURL = 'http://localhost:8888'

// 请求拦截器白名单
const whiteList = {
  'post,/reg': true,
  'post,/login': true,
  'post,/check': true
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // permission: 本次请求所对应的权限字符串, 例如: 'get,/delGoods'
    const permission = config.method + ',' + config.url
    // 如果本次请求在白名单内, 不拦截
    if (whiteList[permission]) return config
    // 如果当前用户具有本次请求的权限, 不拦截
    if (store.state.permissions[permission]) return config
    // 当前用户没有本次请求的权限, 拦截
    return Promise.reject('no permission')
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => response.data
)

// 登录接口
// user 格式为 { username: 'admin', password: '123456' }
export const login = user => {
  return axios.post('/login', user)
}

// 注册接口
export const reg = user => {
  return axios.post('/reg', user)
}

// token 校验接口
// token 类型为 string
export const check = token => {
  return axios.post('/check', { token })
}

// 获取货物信息
// getGoods.p: 其中 p 全写为 permission, 为本接口所对应的权限字符串
// getGoods.r: 其中 r 全写为 request, 为调用 ajax 的方法
export const getGoods = {
  p: 'get,/getGoods',
  r: () => axios.get('/getGoods')
}

// 删除货物信息
export const delGoods = {
  p: 'get,/delGoods',
  r: () => axios.get('/delGoods')
}

// 获取客户信息
export const getCustomers = {
  p: 'get,/getCustomers',
  r: () => axios.get('/getCustomers')
}

// 删除客户信息
export const delCustomers = {
  p: 'get,/delCustomers',
  r: () => axios.get('/delCustomers')
}
