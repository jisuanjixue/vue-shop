import axios from 'axios'
export default {
  // 请求商品列表
  getProductList ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8080/api/productList').then((res) => {
        commit('setProductList', { productList: res.data.productList })
        resolve()
      })
    })
  }
}
