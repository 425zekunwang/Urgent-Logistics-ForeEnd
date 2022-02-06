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
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
      >
        <!-- <el-table-column type="index"></el-table-column> -->
        <div v-for="item in tempData[rootId].children[childId].children"
          :key="item.id">
          <el-table-column
          v-if="item.isoperation == false"
          :prop="item.name"
          header-align="center"
                            align="center"
          :label="item.title"
          width="180"
        >
        </el-table-column>
        <div  v-else>
            <el-table-column
                prop="operation1"
                label="操作1"
                header-align="center"
                            align="center"
                width="180">
          <template>
            <el-button type="info">进货</el-button>
          </template>
        </el-table-column>
            <el-table-column
            prop="operation2"
            header-align="center"
                            align="center"
            label="操作2"
            width="180"
            >
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
        vehicleCondition: '空闲',
        location: '长沙园区',
        loadableCapacity: '12t',
        transportationCost: '150',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211004',
        vehicleCondition: '忙碌',
        location: '沅江园区',
        loadableCapacity: '12t',
        transportationCost: '120',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211005',
        vehicleCondition: '空闲',
        location: '宁乡园区',
        loadableCapacity: '12t',
        transportationCost: '200',
        operation1: true,
        operation2: true
      }],
      tempData: [],
      rootId: 0,
      childId: 0
    }
  },
  methods: {},

  mounted () {
    this.tempData = JSON.parse(window.sessionStorage.getItem('menu_data'))
    this.rootId = window.sessionStorage.getItem('rootId')
    this.childId = window.sessionStorage.getItem('childId')
  }
}
</script>
