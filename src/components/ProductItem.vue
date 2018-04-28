<template>
  <div class="product">
    <router-link :to="'/product/' + info.id" class="product-main">
      <!-- <van-row>
        <van-col><img :src="info.image"></van-col>
      </van-row>
      <van-row>
        <van-col><h4>{{info.name}}</h4></van-col>
      </van-row>
      <van-row>
        <van-col><div class="product-color" :style="{background: colors[info.color]}"></div></van-col>
      </van-row>
      <van-row>
        <van-col><div class="product-cost">¥ {{info.cost}}</div></van-col>
      </van-row>
      <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div> -->
      <img :src="info.image">
      <h4>{{ info.name }}</h4>
      <div class="product-color" :style="{ background: colors[info.color]}"></div>
      <div class="product-cost">¥ {{ info.cost }}</div>
      <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div>
    </router-link>
  </div>
</template>

<script>
// import Vue from 'vue'
// import { Row, Col } from 'vant'
// Vue.use(Row).use(Col)
export default {
  props: ['info'],
  data () {
    return {
      colors: {
        '白色': '#ffffff',
        '金色': '#dac272',
        '蓝色': '#233472',
        '红色': '#f2352e'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product{
  width: 20%;
  float: left;
}
.product-main{
  display: block;
  margin: 10px;
  padding: 16px;
  border: 1px solid #dddee1;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  text-align: center;
  position: relative;
}
.product-main img{
  width: 50%;
}
h4{
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product-main:hover h4{
  color: #0070c9;
}
.product-color{
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #dddee1;
  border-radius: 50%;
  margin: 6px auto;
}
.product-cost{
  color: #de4037;
  margin-top: 6px;
}
.product-add-cart{
  display: none;
  padding: 4px 8px;
  background: #2d8cf0;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
}
.product-main:hover .product-add-cart{
  display: inline-block;
}
</style>
