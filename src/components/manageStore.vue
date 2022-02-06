<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>备件管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="tableData"
                style="width: 100%"
                height="600"
                stripe>
        <div v-for="item in tempData.children"
             :key="item.id">
          <el-table-column :prop="item.name"
           header-align="center"
                            align="center"
                           :label="item.title"
                           width="200">
          </el-table-column>
        </div>
        <el-table-column prop="operationOne"
         header-align="center"
                            align="center"
                         label="操作1"
                         width="180">
          <template slot-scope="scope">
            <el-button type="info"
                       @click="xiugai1(scope.row,scope.$index)">智能分类</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operationTwo"
         header-align="center"
                            align="center"
                         label="操作2"
                         width="180">
          <template slot-scope="scope">
            <el-badge value="类别变化" :hidden= "scope.$index === isShowRed?false:true" max="10" >
                <el-button type="info" :disabled = "scope.$index === isShowRed?false:true"
                       @click="xiugai(scope.row)">库存策略
                       </el-button>
            </el-badge>

          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="请输入备件原始数据"
               :visible.sync="isShowS"
               width="30%"
               center
               :before-close="handleClose">
      <div class="dialogBox">
        <el-form :label-position="labelPosition"
                 label-width="100px"
                 :model="formLabelAlign">
          <el-form-item label="备件名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="年订货量金额">
            <el-input v-model="formLabelAlign.total_amount"></el-input>
          </el-form-item>
          <el-form-item label="订货提前期">
            <el-input v-model="formLabelAlign.forward_date"></el-input>
          </el-form-item>
          <el-form-item label="通用属性">
            <el-input v-model="formLabelAlign.general"></el-input>
          </el-form-item>
          <el-form-item label="需求变化系数">
            <el-input v-model="formLabelAlign.num"></el-input>
          </el-form-item>
          <el-form-item label="需求等级">
            <el-input v-model="formLabelAlign.pro_level"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isShowS = false">取 消</el-button>
        <el-button type="primary"
                   @click="start">开始分类</el-button>
      </span>
    </el-dialog>
    <el-dialog title="变化结果"
               :visible.sync="isShowS1"
               width="30%"
               center
              >
      <div class="dialogResultBox">
         <div class="dialogBox">
            <div class="item">
              <span>备件类型：</span>
              <span>{{formLabelAlign2.product_num }}</span>
            </div>
            <div class="item">
              <span>订货量：</span>
              <span>{{formLabelAlign2.order_quantity }}件</span>
            </div>
            <div class="item">
              <span>安全库存：</span>
              <span>{{formLabelAlign2.safe_stock }}件</span>
            </div>
            <div class="item">
              <span>最大库存水平：</span>
              <span>{{formLabelAlign2.max_stock }}件</span>
            </div>
      </div>
      </div>
      <span slot="footer"
            class="dialog-footer">

        <el-button @click="isShowS1 = false">取 消</el-button>
        <el-button type="primary"
                   @click="isShowS1 = false">完成</el-button>
      </span>
    </el-dialog>
    <el-dialog title="等待加载中"
               :visible.sync="isShowS6"
               width="30%"
               center
              >
      <div class="el-icon-loading">

      </div>
      <span slot="footer"
            class="dialog-footer">
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
      isShowRed: -1,
      tempShowRed: -1,
      loading: true,
      isShowS6: false,
      tableData: [],
      rootId: 0,
      childId: 0,
      isShowS: false,
      isShowS1: false,
      tempDialog: [],
      formLabelAlign: {
        name: '',
        total_amount: 0,
        forward_date: '',
        general: 0,
        pro_level: '',
        num: 0.0
      },
      formLabelAlign2: {},
      tempData: {
        children: [
          { id: 5, title: '需求等级', name: 'demandlevel' },
          { id: 1, title: '顺序号', name: 'orderId' },
          { id: 8, title: '备件名称', name: 'product_name' },
          { id: 2, title: '库存金额（元）', name: 'restMoney' },
          { id: 3, title: '通用性', name: 'general' },
          { id: 4, title: '订货提前期', name: 'advanceDate' }

        ]
      }
    }
  },
  methods: {
    get_spare_info () {
      const that = this
      that.$axios(
        {
          method: 'get',
          url: that.$api + '/spare/all',
          withCredentials: true
        }).then(res => {
        this.tableData = []
        if (res.data.flag) {
          for (const i of res.data.data) {
            this.tableData.push({
              demandlevel: i.demandlevel,
              orderId: i.orderId,
              product_name: i.product_name,
              restMoney: i.restMoney,
              general: i.general,
              advanceDate: i.advanceDate
            })
          }
          this.$message.success('获取数据成功')
        } else {
          this.$message.error('获取数据失败')
        }
      })
    }
  },
  mounted () {
    this.get_spare_info()
  }
}
</script>

<style lang="less" scoped>
  .el-badge{
    margin-top: 10px;
    margin-right: 10px;
    /deep/.el-badge__content.is-fixed{
      right:45px;
      top:15px;
    }
  }
  .el-icon-loading{
    font-size: 100px;
  }
  .dialogResultBox{
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
  }

</style>
