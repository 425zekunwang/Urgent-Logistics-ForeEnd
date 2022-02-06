<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物流端</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="tableData"
                style="width: 100%"
                stripe>
        <div v-for="item in tempData.children"
             :key="item.id">
          <el-table-column v-if="item.isoperation == false"
                           :prop="item.name"
                           header-align="center"
                            align="center"
                           :label="item.title"
                           width="180">
          </el-table-column>
        </div>
        <el-table-column prop="operation1"
                         label="操作1"
                         header-align="center"
                            align="center"
                         width="180">
          <template slot-scope="scope">

            <el-button type="info"
                       disabled='scope.row.trade_status != "等待发货"'
                       @click="songhuo(scope.row)">开始发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="调车配送"
               :visible.sync="isShowS"
               width="30%"
               center
               :before-close="handleClose">
      <div class="dialogBox">
        <div class="item"
             v-for="(item, index) in dialogShow"
             :key="index">
          <span>{{item.name}}:</span>
          <span class="tt">{{item.value}}</span>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">

        <el-button @click="isShowS = false">取 消</el-button>
        <el-button type="primary"
                   @click="set_out">出发</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true,
      isShowS: false,
      formLabelWidth: '120px',
      num: 1,
      tableData: [],
      dialogShow: [],
      tempDialog: [
        { name: '编号', value: '' },
        { name: '配送地点', value: '' },
        { name: '配送备件', value: '' },
        { name: '配送数量', value: '' },
        { name: '要求抵达时间点', value: '' }
      ],
      tempData: {
        children: [
          { id: 8, title: '车辆状态', name: 'trade_status', isoperation: false },
          { id: 1, title: '顺序号', name: 'orderId', isoperation: false },
          { id: 2, title: '备件名称', name: 'product_name', isoperation: false },
          { id: 3, title: '配送数量', name: 'order_num', isoperation: false },
          { id: 4, title: '订货客户', name: 'order_customer', isoperation: false },
          { id: 5, title: '客户ID', name: 'order_customer_id', isoperation: false },
          { id: 6, title: '配送地点', name: 'to_area', isoperation: false },
          { id: 7, title: '抵达时间点', name: 'arrive_time', isoperation: false }

        ]
      }
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    songhuo (obj) {
      this.isShowS = true
      const tempdate2 = this.tempDialog
      tempdate2[0].value = obj.id
      tempdate2[1].value = obj.to_area
      tempdate2[2].value = obj.product_name
      tempdate2[3].value = obj.order_sum
      tempdate2[4].value = obj.arrive_time
      this.dialogShow = tempdate2
      console.log('dd', obj)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    set_out () { this.isShowS = false }
  },
  async mounted () {
    const that = this
    await this.$axios.get(this.$api + '/admin/get-output-info', {
    }).then((res) => {
      console.log('数据：', res.data)
      that.tableData = res.data.date
    }).catch(err => {
      console.log(err)
    })
    // console.log('iii', this.tableData2.date)
  }

}
</script>

<style lang="less" scoped>
.el-switch {
  margin: 10px 0px;
}
.dialogBox {
  display: flex;
  flex-direction: column;
  align-content: center;
  .item {
    margin: 10px 20%;
    span {
      width: 6.25rem;
      margin-right: 40px;
    }
  }
}
</style>
