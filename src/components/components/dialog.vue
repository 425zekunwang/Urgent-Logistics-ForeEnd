
<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="cancelDialog">
      <h1 class="total">用户反馈意见</h1>
      <el-form class="form">
        <el-form-item>
          <h5>反馈意见：</h5>
          <p class="advise">&nbsp;&nbsp;&nbsp;&nbsp;{{dialogInfo.Advise}}</p>
        </el-form-item>
        <el-form-item>
          <img v-for="(item,index) in dialogInfo.FileUrls" :src="item" alt="无法显示" :key="index" class="img">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="cancelDialog">确 定</el-button>
      </div>
  </el-dialog>
</template>

<script>
export default {
  // 父组件传过来的值（列表页传）
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogInfo: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data () {
    return {}
  },
  methods: {
  // 修改父组件传过来的值
    cancelDialog () {
      console.log(this.dialogInfo)
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style scoped>
  .form{
    background: #eee;
    padding: 0 10px;
  }
  .dialog-footer{
    text-align: center;
  }
  .total{
      text-align: center;
      font-size: large;
      padding-bottom: 20px;
  }
  .img{
      width: 400px;
      height: 220px;
      padding: 10px;
      display:inline-block;
  }
</style>
