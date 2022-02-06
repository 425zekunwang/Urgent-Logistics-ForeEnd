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
      <el-table :data="tableData" style="width: 100%" stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column
          v-for="item in tempData[rootId].children[childId].children"
          :key="item.id"
          :prop="item.name"
          header-align="center"
                            align="center"
          :label="item.title"
          :v-if="item.title !== '操作'"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="operation1" header-align="center"
                            align="center" label="操作" width="180">
          <template>
            <el-button type="info">进货</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operation2" header-align="center"
                            align="center" label="操作" width="180">
          <template>
            <el-button type="info">出货</el-button>
          </template>
        </el-table-column>
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
      tempData: [],
      rootId: 0,
      childId: 0,
      hasOperation: false,
      tableData: [{
        index: 'ZL20211003',
        enterpriseName: '长沙英平',
        adjustableVehicle: '53',
        fee: '3200',
        NearestFleetLocation: '长沙岳麓区',
        estimatedTimeOfArrival: '2021/10/5',
        operation1: true,
        operation2: true
      },
      {
        index: 'ZL20211004',
        enterpriseName: '湖南任毅',
        adjustableVehicle: '24',
        fee: '2800',
        NearestFleetLocation: '沅江工业园区',
        estimatedTimeOfArrival: '2021/10/6',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211005',
        enterpriseName: '湖南重工',
        adjustableVehicle: '51',
        fee: '2300',
        NearestFleetLocation: '沅江工业园区',
        estimatedTimeOfArrival: '2021/10/7',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211006',
        enterpriseName: '湖南三一',
        adjustableVehicle: '36',
        fee: '1500',
        NearestFleetLocation: '汉寿工业园区',
        estimatedTimeOfArrival: '2021/10/8',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211007',
        enterpriseName: '长沙英平',
        adjustableVehicle: '24',
        fee: '2400',
        NearestFleetLocation: '宁乡工业园区',
        estimatedTimeOfArrival: '2021/10/9',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211007',
        enterpriseName: '长沙英平',
        adjustableVehicle: '21',
        fee: '3200',
        NearestFleetLocation: '宁乡工业园区',
        estimatedTimeOfArrival: '2021/10/10',
        operation1: true,
        operation2: true
      }]
    }
  },
  methods: {},

  mounted () {
    this.tempData = JSON.parse(window.sessionStorage.getItem('menu_data'))
    this.rootId = window.sessionStorage.getItem('rootId')
    this.childId = window.sessionStorage.getItem('childId')
    console.log(this.tempData[this.rootId].children[this.childId].children)
    for (let index = 0; index < this.tempData[this.rootId].children[this.childId].children.length; index++) {
      const temp = this.tempData[this.rootId].children[this.childId].children[index]
      console.log(temp)
      if (temp.name === 'operation') {
        this.tempData[this.rootId].children[this.childId].children.splice(index, 1)
        this.hasOperation = true
      }
    }
  }
}
</script>
