<template>
  <div class="customers">
    <h2>Customers</h2>
    <button v-has="getCustomersP" @click="getCustomersR">获取客户信息</button>
    <button v-has="delCustomersP" @click="delCustomersR">删除客户信息</button>
  </div>
</template>

<script>
// 同 Goods.vue
import { getCustomers, delCustomers } from '../api/api.js'
export default {
  data() {
    return {
      getCustomersP: getCustomers.p,
      delCustomersP: delCustomers.p
    }
  },
  methods: {
    async getCustomersR() {
      const res = await getCustomers.r()
      alert(res.data)
    },
    async delCustomersR() {
      const res = await delCustomers.r()
      alert(res.data)
    }
  }
}
</script>
