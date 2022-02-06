<template>
  <div class="bigBox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ tempData[rootId].title }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{
        tempData[rootId].children[childId].title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addBox">
      <el-button size="mini"   style="margin:0;font-size:25px;font-weight:800 ">添加</el-button>
    </div>
    <el-card>

      <el-table :data="tableData"
                style="width: 100%"
                stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <div v-for="item in tempData[rootId].children[childId].children"
             :key="item.id">
          <el-table-column v-if="item.isoperation == false"
                           :prop="item.name"
                           header-align="center"
                            align="center"
                           :label="item.title"
                           width="180">
          </el-table-column>
          <div v-else>
            <el-table-column prop="operation1"
            header-align="center"
            align="center"
                             label="操作1"
                             width="180">
              <template>
                <el-button type="info">进货</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="operation2"
            header-align="center"
             align="center"
                             label="操作2"
                             width="180">
              <template>
                <el-button type="info">出货</el-button>
              </template>
            </el-table-column>

          </div>
        </div>
      </el-table>
    </el-card>
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
      tableData: [{
        index: 'ZL20211003',
        manage: '顾先生',
        center: '长沙总仓',
        tel: '020-21111'

      }, {
        index: 'ZL20211003',
        manage: '顾先生',
        center: '长沙总仓',
        tel: '020-231111'

      }, {
        index: 'ZL20211003',
        manage: '顾先生',
        center: '长沙总仓',
        tel: '020-111111'

      }],
      tempData: [],
      rootId: 0,
      childId: 0,
      hasOperation: false
    }
  },
  methods: {
    get_delivery_info () {
      const that = this
      that.$axios(
        {
          method: 'get',
          url: that.$api + '/delivery/all',
          withCredentials: true
        }).then(res => {
        this.tableData = []
        if (res.data.flag) {
          for (const i of res.data.data) {
            this.tableData.push({
              serialNumber: i.serialNumber,
              tel: i.tel,
              manage: i.manage,
              center: i.center
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
    this.tempData = JSON.parse(window.sessionStorage.getItem('menu_data'))
    this.rootId = window.sessionStorage.getItem('rootId')
    this.childId = window.sessionStorage.getItem('childId')
    this.get_delivery_info()
    // console.log(this.tempData[this.rootId].children[this.childId].children)
  }
}
</script>

<style lang="less" scoped>
.bigBox{
  position: relative;
  .addBox{
    position: absolute;
    left: 445px;
    top: -5px;
  }
}
</style>
