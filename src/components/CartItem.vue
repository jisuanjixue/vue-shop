<template>
  <div>
    <van-row>
      <van-col span="10">
        <img :src="productDictList[item.id].image" width="20%">
        <span class="info-name">{{ productDictList[item.id].name }}</span>
      </van-col>
      <van-col span="3">¥ {{ productDictList[item.id].cost }}</van-col>
      <van-col span="5">
        <van-stepper v-model="item.count" :min="1" :step="1" :default-value="1" @click="handleCount" />
      </van-col>
      <van-col span="3">¥ {{ productDictList[item.id].cost * item.count }}</van-col>
      <van-button span="3" type="danger" size="mini" @click.native="handleDel">删除</van-button>
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    productList: {
      type: Array,
      required: true
    }
  },
  computed: {
    productDictList () {
      const dict = {}
      this.productList.forEach(item => {
        dict[item.id] = item
      })
      return dict
    }
  },
  methods: {
    handleCount () {
      this.$emit('changCount', this.item.count)
    },
    handleDel () {
      this.$emit('handleClear', this.item.id)
    }
  }
}
</script>

<style scoped>

</style>
