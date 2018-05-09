<template>
  <div v-if="product">
    <div class="product">
      <div class="swiper-area">
        <van-swipe @change="onChange">
          <van-swipe-item v-for="( pic, index) in images" :key="index" >
              <img v-lazy="pic" width="50%"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <van-row>
        <van-col>
          <h4 class="product-name">{{ product.name }}</h4>
          <div class="product-cost">¥{{ product.cost }}</div>
        </van-col>
      </van-row>
      <van-row class="sub-info">
        <van-col span="8">快递:0.0</van-col>
        <van-col span="8">月销量 {{ product.sales }} 件</van-col>
        <van-col span="8">电器城昆明仓</van-col>
      </van-row>
      <p class="three"></p>
      <van-row>
        <van-col class="product-desc">
          <h2>产品介绍</h2>
          <!-- <lazy-component> -->
            <img v-for=" img in images" :key="img.id" v-lazy="img">
          <!-- </lazy-component> -->
        </van-col>
      </van-row>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服" />
      <van-goods-action-mini-btn icon="cart" text="购物车" :info="cartCount" to="/cart" />
      <van-goods-action-mini-btn icon="shop" text="店铺" />
      <van-goods-action-big-btn text="加入购物车" @click="handleAddToCart" />
      <van-goods-action-big-btn text="立即购买"  @click="handleBuy" primary />
    </van-goods-action>
    <van-sku
      v-model="showCustomAction"
      :sku="sku"
      :goods="goods"
      :hide-stock="hide_stock"
    >
      <template slot="sku-header-price" slot-scope="props">
        <div class="van-sku__goods-price">
          <span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ props.price }}</span>
        </div>
      </template>
      <!-- 自定义 sku actions -->
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <van-button bottom-action @click="onPointClicked">积分兑换</van-button>
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">立即购买</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col, Lazyload, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Sku, Swipe, SwipeItem } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Lazyload).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(Sku).use(Swipe).use(SwipeItem)
export default {
  data () {
    return {
      id: parseInt(this.$route.params.id),
      product: null,
      cartCount: 0,
      showCustomAction: false,
      sku: {
        tree: [
          {
            k: '颜色',
            v: [
              {
                id: '',
                name: '',
                imgUrl: ''
              }
            ],
            k_s: 's1'
          }
        ],
        list: [
          {
            id: null,
            price: null,
            s1: '',
            s2: '',
            s3: '0',
            stock_num: null
          }
        ],
        price: '1.00',
        stock_num: 227,
        collection_id: 2261,
        none_sku: false,
        hide_stock: false
      },
      goods: {
        title: '请选择颜色分类,尺寸',
        picture: ''
      },
      hide_stock: false
    }
  },
  created () {
    let productList = this.$store.state.productList
    this.product = productList.find(item => item.id === this.id)
  },
  methods: {
    handleAddToCart () {
      this.$store.commit('addCart', this.id)
      this.$toast.success('加入购物车成功')
      let list = this.$store.state.cartList
      this.cartCount = list.length
    },
    handleBuy () {
      this.showCustomAction = true
    },
    onPointClicked () {
      this.$toast.success('点击按钮')
    },
    onChange (index) {
      let count = this.$store.getters.images
      this.$toast(index + 1 + '/' + count.length)
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
    margin-top: -60px;
    padding: 10px;
    background: #fff;
    border: 1px solid #dddee1;
    border-radius: 10px;
  }
  .swiper-area{
    clear:both;
    max-height:15rem;
    overflow: hidden;
  }
  .sub-info {
    color: #555;
    margin-left:-40px;
    /* float: left; */
    font-size: .5rem;
  }
  .product-image{
    width: 80%;
    height: 100%;
    float: left;
    text-align: center;
  }
  .product-cost{
    color: #f2352e;
    margin: 8px 0px;
    float: left;
    font-size: 1.5rem;
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
    padding: 20px;
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
