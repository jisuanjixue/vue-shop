export default {
  // 添加商品列表
  setProductList (state, payload) {
    state.productList = payload.productList
  },
  // 添加到购物车
  addCart (state, id) {
    // 先判断购物车是否已有, 如果有,数量加1
    const isAdded = state.cartList.find(v => v.id === id)
    if (isAdded) {
      isAdded.count++
    } else {
      state.cartList.fill({
        id: id,
        count: 1
      })
    }
  },
  // 修改商品数量
  editCartCount (state, payload) {
    const product = state.cartList.find(v => v.id === payload.id)
    product.count += payload.count
  },
  // 删除商品
  deleteCart (state, id) {
    const index = state.carList.findIndex(v => v.id === id)
    state.cartList.splice(index, 1)
  },
  // 清空购物车
  emptyCart (state) {
    state.cartList = []
  }
}
