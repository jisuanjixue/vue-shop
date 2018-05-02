import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMall',
      component (resolve) {
        require(['../pages/ShoppingMall.vue'], resolve)
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component (resolve) {
        require(['../pages/Cart.vue'], resolve)
      }
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component (resolve) {
        require(['../pages/ProductDetail.vue'], resolve)
      }
    }
  ]
})
