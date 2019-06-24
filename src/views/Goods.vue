<template>
  <div class="goods">
    <h2>Goods</h2>
    <!-- v-has 为自定义指令, 传入[权限字符串] -->
    <!-- 如果该用户没有此权限, v-has 会将此 DOM 节点移除 -->
    <!-- 详见: main.js -->
    <button v-has="getGoodsP" @click="getGoodsR">获取货物信息</button>
    <button v-has="delGoodsP" @click="delGoodsR">删除货物信息</button>
  </div>
</template>

<script>
// 导入 获取货物信息 及 删除货物信息 的 api
import { getGoods, delGoods } from '../api/api.js'
export default {
  data() {
    return {
      // ajax 请求对应的权限字符串, 例如: 'get,/getGoods'
      getGoodsP: getGoods.p,
      delGoodsP: delGoods.p
    }
  },
  methods: {
    // ajax 请求方法
    async getGoodsR() {
      const res = await getGoods.r()
      alert(res.data)
    },
    async delGoodsR() {
      const res = await delGoods.r()
      alert(res.data)
    }
  }
}
</script>
