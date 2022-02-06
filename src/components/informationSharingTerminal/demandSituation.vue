<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ tempData[rootId].title }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{
        tempData[rootId].children[childId].title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="tableData"
                style="width: 100%"
                stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <div v-for="item in tempData[rootId].children[childId].children"
             :key="item.id">
          <el-table-column :prop="item.name"
          header-align="center"
                            align="center"
                           :label="item.title"
                           width="180">
          </el-table-column>
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
        purchaseAlert: '客户1',
        address2: '长沙',
        name: '切割环Φ230',
        purchase: '321',
        solution: '已处理'
      }, {
        index: 'ZL20211004',
        purchaseAlert: '客户2',
        address2: '株洲',
        purchase: '123',
        name: '齿轮油\\SHC220\\18L',
        solution: '未处理'
      }, {
        index: 'ZL20211005',
        purchaseAlert: '客户3',
        purchase: '532',
        address2: '湘潭',
        name: '中联-美孚液压油208L',
        solution: '未处理'
      }],
      tempData: [],
      rootId: 0,
      childId: 0,
      hasOperation: false
    }
  },
  methods: {},

  mounted () {
    this.tempData = JSON.parse(window.sessionStorage.getItem('menu_data'))
    this.rootId = window.sessionStorage.getItem('rootId')
    this.childId = window.sessionStorage.getItem('childId')
    console.log(this.tempData[this.rootId].children[this.childId].children)
  }
}
</script>
