
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
     <el-button size="mini"   style="margin:0;font-size:25px;font-weight:800 " @click="add">添加</el-button>
    </div>
    <el-card>
      <el-table :data="tableData"
                style="width: 100%"

                stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <div v-for="item in tempData[rootId].children[childId].children"
             :key="item.id">
          <el-table-column :prop="item.name"
                           :label="item.title"
                           header-align="center"
                           align="center"
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
      tableData: [],
      tempData: [],
      rootId: 0,
      childId: 0,
      hasOperation: false
    }
  },
  methods: {
    getall () {
      const that = this
      that.$axios(
        {
          method: 'get',
          url: that.$api + '/goods/all',
          withCredentials: true
        }).then(res => {
        this.tableData = []
        if (res.data.flag) {
          for (const i of res.data.data) {
            this.tableData.push({
              serialNumber: i.serialNumber,
              name: i.name,
              kind: i.kind,
              specifications: i.specifications
            })
          }
          this.$message.success('获取数据成功')
        } else {
          this.$message.error('获取数据失败')
        }
      })
    },
    add () {
      this.$message.info('添加')
    }
  },

  mounted () {
    this.tempData = JSON.parse(window.sessionStorage.getItem('menu_data'))
    this.rootId = window.sessionStorage.getItem('rootId')
    this.childId = window.sessionStorage.getItem('childId')
    this.getall()
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
