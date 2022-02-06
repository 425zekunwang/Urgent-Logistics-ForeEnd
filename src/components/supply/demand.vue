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
          width="200"
        >
        </el-table-column>
        <el-table-column prop="operation1" label="操作" header-align="center"
                            align="center" width="180">
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
      tableData: [{
        index: 'ZL20211003',
        park: '长沙麓谷工业园',
        classify: 'A1',
        details: '富力通轮胎18PR/S-3050\\12.00R20',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211004',
        park: '沅江工业园',
        classify: 'A1',
        details: '万力轮胎18PR/SAM01+\\12.00R20',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211005',
        park: '沅江工业园',
        classify: 'B2',
        details: '龙蟠-中联专用尿素溶液1000KG',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211006',
        park: '汉寿工业园',
        classify: 'C2',
        details: '3米双头软管',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211007',
        park: '宁乡工业园',
        classify: 'C1',
        details: '眼镜板Φ200',
        operation1: true,
        operation2: true
      }, {
        index: 'ZL20211008',
        park: '宁乡工业园',
        classify: 'B2',
        details: 'O型圈（ø260眼镜板经济型）',
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
