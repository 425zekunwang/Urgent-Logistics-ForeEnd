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

        </div>
        <el-table-column prop="operation1"
                         label="操作1"
                         header-align="center"
                            align="center"
                         width="180">
          <template>
            <el-button type="info">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operation2"
                         label="操作2"
                         header-align="center"
                            align="center"
                         width="180">
          <template>
            <el-button type="info">未处理</el-button>
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
        user_name: '客户L',
        question_type: '缺货/少货',
        question_time: '2021-11-25'
      }, {
        user_name: '客户M',
        question_type: '运输服务',
        question_time: '2021-12-1'
      }, {
        user_name: '客户N',
        question_type: '货物损坏',
        question_time: '2021-12-10'
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
