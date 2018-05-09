<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="4">
          <img :src="locationIcon" width="30%" class="location-icon">
        </van-col>
        <van-col span="10">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
        <van-col span="5">
          <router-link to="/cart" class="header-menu-cart">
            <van-icon name="cart"/><span v-if="cartList.length"> {{cartList.length}}</span>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="( banner ,index) in bannerPicArray" :key="index" >
            <img v-lazy="banner.imageUrl" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 点击筛选时的样式变化,用绑定样式的方法, 在css里切换 -->
    <div class="list-control">
      <div class="list-control-filter">
        <span>品牌：</span>
        <span
          class="list-control-filter-item"
          :class="{on: item === filterBrand}"
          v-for="item in brands" :key="item"
          @click="handleFilterBrand(item)">{{ item }}
        </span>
      </div>
      <div class="list-control-filter">
        <span>颜色：</span>
        <span
          class="list-control-filter-item"
          :class="{on: item === filterColor}"
          v-for="item in colors" :key="item"
          @click="handleFilterColor(item)">{{ item }}
        </span>
      </div>
      <div class="list-control-order">
        <span>排序：</span>
        <span
          class="list-control-order-item"
          :class="{on: order === ''}"
          @click="handleOrderDefault">默认</span>
        <span
          class="list-control-order-item"
          :class="{on: order === 'sales'}"
          @click="handleOrderSales">
          销量
          <template v-if="order === 'sales'">↓</template>
        </span>
        <span
          class="list-control-order-item"
          :class="{on: order.indexOf('cost') > -1}"
          @click="handleOrderCost">
          价格
          <template v-if="order === 'cost-asc'">↑</template>
          <template v-if="order === 'cost-desc'">↓</template>
        </span>
      </div>
    </div>
    <product-item v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></product-item>
  </div>
</template>

<script>
import Vue from 'vue'
import productItem from '../components/ProductItem'
import { Button, Row, Col, Swipe, SwipeItem, Lazyload, Tab, Tabs, Icon } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(Tab).use(Tabs).use(Icon)
export default {
  components: {productItem},
  data () {
    return {
      locationIcon: require('../assets/images/location.png'),
      bannerPicArray: [
        {imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
        {imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
        {imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'}
      ],
      filterBrand: '',
      filterColor: '',
      order: ''
    }
  },
  created () {
  },
  computed: {
    list () {
      return this.$store.state.productList
    },
    brands () {
      return this.$store.getters.brands
    },
    colors () {
      return this.$store.getters.colors
    },
    filteredAndOrderedList () {
      let list = [...this.list]
      // 按品牌过滤
      if (this.filterBrand !== '') {
        list = list.filter(item => item.brand === this.filterBrand)
      }
      // 按颜色过滤
      if (this.filterColor !== '') {
        list = list.filter(item => item.color === this.filterColor)
      }
      // 排序
      if (this.order !== '') {
        if (this.order === 'sales') {
          list = list.sort((a, b) => b.sales - a.sales)
        } else if (this.order === 'cost-desc') {
          list = list.sort((a, b) => b.cost - a.cost)
        } else if (this.order === 'cost-asc') {
          list = list.sort((a, b) => a.cost - b.cost)
        }
      }
      return list
    },
    cartList () {
      return this.$store.state.cartList
    }
  },
  mounted () {
    this.$store.dispatch('getProductList')
  },
  methods: {
    handleFilterBrand (brand) {
      if (this.filterBrand === brand) {
        this.filterBrand = ''
      } else {
        this.filterBrand = brand
      }
    },
    handleFilterColor (color) {
      if (this.filterColor === color) {
        this.filterColor = ''
      } else {
        this.filterColor = color
      }
    },
    handleOrderSales () {
      this.order = 'sales'
    },
    handleOrderDefault () {
      this.order = ''
    },
    handleOrderCost () {
      if (this.order === 'cost-desc') {
        this.order = 'cost-asc'
      } else {
        this.order = 'cost-desc'
      }
    }
  }
}
</script>

<style scoped >
  .search-bar{
    margin-top:-4rem;
    height:4.2rem;
    background-color: #e5017d;
    line-height: 5.2rem;
    overflow: hidden;
  }
  .search-input{
    width:100%;
    height: 1.3rem;
    border-top:0px;
    border-left:0px;
    border-right:0px;
    border-bottom:1px solid #fff !important;
    background-color: #e5017d;
    color:#fff;
  }
  .location-icon{
    padding-top:1rem;
    padding-left:.3rem
  }
  .swiper-area{
    clear:both;
    max-height:15rem;
    overflow: hidden;
  }
  .list-control{
    background: #fff;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
  }
  .list-control-filter{
      margin-bottom: 16px;
      float: left;
  }
  .list-control-filter-item,
  .list-control-order-item {
    cursor: pointer; /* 定义光标显示类型 */
    display: inline-block;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
  }
  .list-control-filter-item.on,
  .list-control-order-item.on{
    background: #f2352e;
    border: 1px solid #f2352e;
    color: #fff;
  }
  .product-not-found{
    text-align: center;
    padding: 32px;
  }
  .header-menu-cart span {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    background: #ff5500;
    color: #fff;
    font-size: 12px;
  }
</style>
