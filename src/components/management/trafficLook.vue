<template>
  <div>
    <img src="../../assets/images/imformation.jpg"
         alt="" @click="tiaozhuan">
  </div>

</template>

<style lang="less" scoped>
div img {
  width: 100%;
  height: 100%;
}
</style>
<script>
export default {
  methods: {
    tiaozhuan () {
      window.open('http://www.xinshao.gov.cn/xsxjtj/xzcwj/201911/be9e96e2967141c9a233686300b2d76c.shtml')
    }
  },
  created: function () {
    window.open('http://www.xinshao.gov.cn/xsxjtj/xzcwj/201911/be9e96e2967141c9a233686300b2d76c.shtml')
  }
}
</script>
