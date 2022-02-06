<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>供应端</el-breadcrumb-item>
    </el-breadcrumb>
    <el-switch style="display: block"
               v-model="value"
               active-color="#13ce66"
               inactive-color="#ff4949"
               active-text="总仓"
               inactive-text="配送中心">
    </el-switch>

    <el-card>

      <el-table :data="value ? tableData1 : tableData2"
                style="width: 100%"
                stripe>
        <div v-for="item in value
            ?tempData.children1
            : tempData.children2"
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
                       @click="songhuo(scope.row)">进货</el-button>

          </template>

        </el-table-column>

        <el-table-column prop="operation2"
                         label="操作2"
                         width="180">
          <template>
            <el-button type="info">出货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="进货"
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

<script>
export default {
  data () {
    return {
      value: true,
      isShowS: false,
      formLabelWidth: '120px',
      num: 1,
      dialogShow: [],
      tempDialog1: [
        { name: '客户名称', value: '' },
        { name: '备件名称', value: '' },
        { name: '所需数量', value: '' },
        { name: '备件类型', value: '' }
      ],
      tempDialog2: [
        { name: '客户名称', value: '' },
        { name: '所处区域', value: '' },
        { name: '备件名称', value: '' },
        { name: '备件类型', value: '' }
      ],
      tempData: {
        children1: [
          { id: 4, title: '备件类型', name: 'product_type', isoperation: false },
          { id: 0, title: '编号', name: 'id', isoperation: false },
          { id: 1, title: '客户名称', name: 'user_name', isoperation: false },
          { id: 2, title: '备件名称', name: 'product_name', isoperation: false },
          { id: 3, title: '所需数量', name: 'need_sum', isoperation: false }

        ],
        children2: [
          { id: 4, title: '备件类型', name: 'product_type', isoperation: false },
          { id: 0, title: '编号', name: 'id', isoperation: false },
          { id: 1, title: '所处区域', name: 'area', isoperation: false },
          { id: 2, title: '备件名称', name: 'product_name', isoperation: false },
          { id: 3, title: '所需数量', name: 'need_sum', isoperation: false }

        ]
      },
      rootId: 0,
      childId: 0,
      hasOperation: false,
      tableData2: [],
      tableData: []

    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    songhuo (obj) {
      const arr = this.value
        ? this.tempData.children1
        : this.tempData.children2
      this.isShowS = true
      const tempdate2 = this.tempDialog1
      tempdate2[0].value = this.value ? obj.user_name : obj.area
      tempdate2[1].value = obj.product_name
      tempdate2[2].value = obj.need_sum
      tempdate2[3].value = obj.product_type
      this.dialogShow = tempdate2
      console.log(arr)
      console.log('dd', obj)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }

  },
  async created () {
    const that = this
    await this.$axios.get(this.$api + '/admin/get-store-info', {
    }).then((res) => {
      console.log('数据：', res.data)
      that.tableData2 = res.data.date
    }).catch(err => {
      console.log(err)
    })
    await this.$axios.get(this.$api + '/admin/get-center-info', {
    }).then((res) => {
      console.log('数据：', res.data)
      that.tableData1 = res.data.date
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
