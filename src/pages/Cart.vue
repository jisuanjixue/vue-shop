<template>
  <div class="cart">
    <div class="cart-header">
      <van-row class="cart-header-title"><van-col>购物清单</van-col></van-row>
      <van-row class="cart-header-main">
        <van-col span="10">商品信息</van-col>
        <van-col span="3">单价</van-col>
        <van-col span="5">数量</van-col>
        <van-col span="3">小计</van-col>
        <van-col span="3">操作</van-col>
      </van-row>
    </div>
    <div>
      <van-row v-for="(item, index) in cartList" :key="item.id">
        <van-col span="10">
          <img :src="productDictList[item.id].image" width="20%">
          <span class="info-name">{{ productDictList[item.id].name }}</span>
        </van-col>
        <van-col span="3">¥ {{ productDictList[item.id].cost }}</van-col>
        <van-col span="5">
          <van-stepper v-model="item.count" :min="1" :step="1" :default-value="1" @click="change(index)" />
        </van-col>
        <van-col span="3">¥ {{ productDictList[item.id].cost * item.count }}</van-col>
        <van-button span="3" type="danger" size="mini" @click.native="handleDelete(index)">删除</van-button>
      </van-row>
    </div>
    <van-dialog v-model="show" showCancelButton />
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col, Button, Stepper } from 'vant'
Vue.use(Row).use(Col).use(Button).use(Stepper)
export default {
  data () {
    return {
      show: false,
      productList: []
    }
  },
  created () {
    this.productList = this.$store.state.productList
  },
  computed: {
    cartList () {
      return this.$store.state.cartList
    },
    productDictList () {
      const dict = {}
      this.productList.some(item => {
        dict[item.id] = item
      })
      return dict
    }
  },
  methods: {
    change (index, count) {
      this.$store.commit('editCartCount', {
        id: this.cartList[index].id,
        count: count
      })
    },
    handleDelete (index) {
      this.$dialog.alert({
        title: '警告',
        message: '是否要删除?'
      }).then(() => {
        this.$store.commit('deleteCart', this.cartList[index].id)
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
  .cart{
    margin: 5px;
    background: #fff;
    border: 1px solid #dddee1;
    border-radius: 10px;
  }
  .cart-header-title{
    padding: 16px 32px;
    border-bottom: 1px solid #dddee1;
    border-radius: 10px 10px 0 0;
    background: #f8f8f9;
  }
  .cart-header-main{
    padding: 8px 0px;
    overflow: hidden;
    border-bottom: 1px solid #dddee1;
    background: #eee;
    overflow: hidden;
  }
  .cart-control-minus,
  .cart-control-add{
    display: inline-block;
    margin: 0 4px;
    width: 24px;
    height: 24px;
    line-height: 22px;
    text-align: center;
    background: #f8f8f9;
    border-radius: 50%;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    cursor: pointer;
  }
</style>
