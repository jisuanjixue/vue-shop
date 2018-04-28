<template>
  <div>
      {{msg}}
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col } from 'vant'
Vue.use(Button).use(Row).use(Col)
export default {
  data () {
    return {
      msg: 'Shopping Mall'
    }
  }
}
</script>
