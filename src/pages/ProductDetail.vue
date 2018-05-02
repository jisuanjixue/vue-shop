<template>
  <div v-if="product">
    <div class="product">
      <van-row>
        <van-col span="12"><img :src="product.image" class="product-image"></van-col>
        <van-col span="12">
          <h2 class="product-name">{{ product.name }}</h2>
          <div class="product-cost">¥ {{ product.cost }}</div>
          <van-button size="small" type="primary" @click="handleAddToCart">加入购物车</van-button>
        </van-col>
      </van-row>
      <van-row>
        <van-col class="product-desc">
          <h2>产品介绍</h2>
          <!-- <lazy-component> -->
            <img v-for=" img in images" :key="img.id" v-lazy="img">
          <!-- </lazy-component> -->
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col, Lazyload } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Lazyload)
export default {
  data () {
    return {
      id: parseInt(this.$route.params.id),
      product: null
    }
  },
  created () {
    let productList = this.$store.state.productList
    this.product = productList.find(item => item.id === this.id)
  },
  methods: {
    handleAddToCart () {
      this.$store.commit('addCart', this.id)
    }
  },
  computed: {
    images () {
      return this.$store.getters.images
    }
  }
}
</script>

<style scoped>
   .product{
        margin: 32px;
        padding: 32px;
        background: #fff;
        border: 1px solid #dddee1;
        border-radius: 10px;
        overflow: hidden;
    }
    .product-image{
        width: 80%;
        height: 100%;
        float: left;
        text-align: center;
    }
    .product-cost{
        color: #f2352e;
        margin: 8px 0;
    }
    .product-add-cart{
        display: inline-block;
        padding: 8px 64px;
        margin: 8px 0;
        background: #2d8cf0;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
    }
    .product-desc{
        background: #fff;
        margin: 32px;
        padding: 32px;
        border: 1px solid #dddee1;
        border-radius: 10px;
        text-align: center;
    }
    .product-desc img{
        display: block;
        width: 50%;
        margin: 32px auto;
        padding: 32px;
        border-bottom: 1px solid #dddee1;
    }
</style>
