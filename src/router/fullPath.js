// 获取全部路由表的方法
export const getFullPath = () => ([
  {
    path: '/',
    name: '首页',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/goods',
        name: '货物管理',
        component: () => import('../views/Goods.vue')
      },
      {
        path: '/customers',
        name: '客户管理',
        component: () => import('../views/Customers.vue')
      },
      {
        path: '/opinion',
        name: '舆情监控',
        component: () => import('../views/Opinion.vue')
      }
    ]
  }
])
