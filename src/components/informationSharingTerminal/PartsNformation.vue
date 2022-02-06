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
          <el-table-column v-if="item.isoperation == false"
                           :prop="item.name"
                           header-align="center"
                            align="center"
                           :label="item.title"
                           width="180">
          </el-table-column>
          <div v-else>
            <el-table-column prop="operation1"
                             label="操作1"
                             header-align="center"
                            align="center"
                             width="180">
              <template>
                <el-button type="info">进货</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="operation2"
                             label="操作2"
                             header-align="center"
                            align="center"
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
        index: '1',
        equipmentName: 'S管阀（230）',
        type: 'A1',
        inventoryNumber: '385',
        operation1: true,
        operation2: true
      }, {
        index: '2',
        equipmentName: '眼镜板Φ260',
        type: 'B1',
        inventoryNumber: '185',
        operation1: true,
        operation2: true
      }, {
        index: '3',
        equipmentName: '230老款型 S管总成',
        type: 'A2',
        inventoryNumber: '174',
        operation1: true,
        operation2: true
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
