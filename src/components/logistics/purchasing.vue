<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物流端</el-breadcrumb-item>
      <el-breadcrumb-item>采购页面</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

      <el-table :data="tableData"
                style="width: 100%"
                stripe>
        <div v-for="item in tempData.children"
             :key="item.id">
          <el-table-column :prop="item.name"
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
                       @click="songhuo(scope.row)">采购</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="采购"
               :visible.sync="isShowS"
               width="30%"
               center
               :before-close="handleClose">
      <div class="dialogBox">
        <div class="item"
             v-for="(item, index) in dialogShow"
             :key="index">
          <span>{{item.name}}:</span>
          <span>{{item.value}}</span>
        </div>
        <div class="item">
          <el-input-number v-model="num"
                           @change="handleChange"
                           :min="1"
                           label="加购数量"></el-input-number>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">

        <el-button @click="isShowS = false">取 消</el-button>
        <el-button type="primary"
                   @click="isShowS = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>
<script>
export default {
  data () {
    return {
      isShowS: false,
      formLabelWidth: '120px',
      num: 1,
      dialogShow: [],
      tempDialog: [
        { name: '订单编号', value: '' },
        { name: '备件名称', value: '' },
        { name: '采购数量', value: '' }
      ],
      tempData: {
        children: [
          { id: 6, title: '采购预警', name: 'purchase_level', isoperation: false },
          { id: 1, title: '序号', name: 'id', isoperation: false },
          { id: 2, title: '所在区域', name: 'area', isoperation: false },
          { id: 3, title: '备件名称', name: 'product_name', isoperation: false },
          { id: 4, title: '订货量', name: 'order_sum', isoperation: false },
          { id: 5, title: '剩余库存', name: 'left_sum', isoperation: false }

        ]
      },
      rootId: 0,
      childId: 0,
      hasOperation: false,
      tableData: []
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    songhuo (obj) {
      this.isShowS = true
      console.log('dd', obj)
      const tempdate2 = this.tempDialog
      tempdate2[0].value = 'AL100003'
      tempdate2[1].value = obj.product_name
      tempdate2[2].value = obj.order_sum
      this.dialogShow = tempdate2
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }

  },
  async mounted () {
    const that = this
    await this.$axios.get(this.$api + '/admin/get-input-info', {
    }).then((res) => {
      console.log('数据：', res.data)
      that.tableData = res.data.date
    }).catch(err => {
      console.log(err)
    })
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
