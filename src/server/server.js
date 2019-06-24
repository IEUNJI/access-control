const express = require('express')
const app = express()
// 支持跨域
const cors = require('cors')
// 处理 post 请求的请求体中的数据
const bodyParser = require('body-parser')
// jwt.sign(): 派发 token
// jwt.verify(): 校验 token
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(bodyParser.json())

const SECRETKEY = 'ieunji' // 加密 token 的密钥
const expires = 600 // token 的过期时间, 单位: s
const port = 8888 // server.js 默认端口
const resTime = 3000 // 模拟响应的延迟时间, 单位: ms

// 权限等级表
const gradesPool = {
  // 游客
  guest: {
    // 路由 (菜单) 权限
    menus: [ '/goods', '/customers' ],
    // ajax 接口调用权限
    permissions: ['get,/getGoods', 'get,/getCustomers']
  },
  // 管理员
  admin: {
    menus: [ '/goods', '/customers', '/opinion' ],
    permissions: ['get,/getGoods', 'get,/delGoods', 'get,/getCustomers', 'get,/delCustomers']
  }
}

// 用户列表
const userList = {
  // key 为用户名
  // value 为包含密码及权限信息的对象
  'admin': {
    password: '123456',
    info: { ...gradesPool.admin }
  }
}

// 注册接口
app.post('/reg', (req, res) => {
  const { username, password } = req.body
  // 如果用户名已存在于 userList 中, 提示 '用户已存在'
  // code: 1 为存在异常, code: 0 为无异常
  if (username in userList) return setTimeout(() => res.json({ code: 1, msg: '用户已存在' }), resTime)
  // 创建该用户的 value 对象, 默认注册的用户都为游客 (guest)
  const user = {
    password,
    info: { ...gradesPool.guest }
  }
  // 存储至 userList 中
  userList[username] = user
  // 派发 token, 注册成功自动登录
  // jwt.sign 传入 3 个参数
  // 分别为: 写入 token 中的信息, 密钥, 过期时间
  const token = jwt.sign({ user: user.info }, SECRETKEY, { expiresIn: expires })
  // 将 token 及用户信息 (user.info) 返回
  setTimeout(() => res.json({ code: 0, msg: '注册成功', token, user: user.info }), resTime)
})

// 登录接口
app.post('/login', (req, res) => {
  const { username, password } = req.body
  // userList 中无此用户名, 提示 '用户不存在'
  if (!(username in userList)) return setTimeout(() => res.json({ code: 1, msg: '用户不存在' }), resTime)
  const user = userList[username]
  // 密码错误
  if (password !== user.password) return setTimeout(() => res.json({ code: 1, msg: '密码错误' }), resTime)
  // 派发 token
  const token = jwt.sign({ user: user.info }, SECRETKEY, { expiresIn: expires })
  setTimeout(() => res.json({ code: 0, msg: '登录成功', token, user: user.info }), resTime)
})

// token 校验接口
app.post('/check', (req, res) => {
  const { token } = req.body
  // jwt.verify 传入 3 个参数
  // 分别为: 要校验的 token, 密钥, 回调函数
  jwt.verify(token, SECRETKEY, (err, decode) => {
    // 存在 err, 返回校验失败
    if (err) return setTimeout(() => res.json({ code: 1, msg: '校验失败' }), resTime)
    // 校验成功, 返回 token 中的信息 (decode, 即 jwt.sign 传入的第 1 个参数)
    setTimeout(() => res.json({ code: 0, msg: '校验成功', decode }), resTime)
  })
})

// 获取货物信息
app.get('/getGoods', (req, res) => {
  setTimeout(() => res.json({ code: 0, data: '成功获取货物信息' }), resTime)
})

// 删除货物信息
app.get('/delGoods', (req, res) => {
  setTimeout(() => res.json({ code: 0, data: '成功删除货物信息' }), resTime)
})

// 获取客户信息
app.get('/getCustomers', (req, res) => {
  setTimeout(() => res.json({ code: 0, data: '成功获取客户信息' }), resTime)
})

// 删除客户信息
app.get('/delCustomers', (req, res) => {
  setTimeout(() => res.json({ code: 0, data: '成功删除客户信息' }), resTime)
})

// 监听端口
app.listen(port, () => {
  console.log(`port ${port} !`)
})
