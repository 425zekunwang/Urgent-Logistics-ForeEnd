//eslint-disable comma-dangle
//  eslint-disable vue/valid-template-root
<template>

  <el-container class="container_top">
    <el-header style="text-align: right; font-size: 12px">
      <span>联机物流 创新的技术应用和服务能力-----智能应急物流系统</span>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="230px">
        <el-menu unique-opened
                 router
                 :default-active="$route.path"
                 class="left-menu">
          <component class="menu-item"
                     v-for="(value) in menu_data"
                     :key="value.id"
                     :index="value.name"
                     active-text-color="rgba(15, 161, 71, 0.89)"
                     :is="(value.children&&value.children.length>0)?'el-submenu':'el-menu-item'">
            <template slot="title">
              <i :class="[value.icon]"></i>
              <span>{{value.title}}</span>
            </template>
            <template v-if="value.children&&value.children.length>0">
              <el-menu-item @click="getActivePath('/'+v.name, value.id,v.id)"
                            class="menu-item"
                            v-for="(v) in value.children"
                            :key="v.id"
                            :index="v.name">
                <i :class="[v.icon]"></i>
                <span slot="title">{{v.title}}</span>
              </el-menu-item>
            </template>
          </component>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      activePath: '',
      tableData: [],
      menu_data: [
        {
          id: 0,
          title: '管理端',
          name: 'management',
          isMore: false,
          children: [
            {
              id: 0,
              title: '货物信息',
              name: 'sparePartsNformation',
              children: [
                { id: 4, title: '种类', name: 'kind', isoperation: false },
                { id: 0, title: '序号', name: 'serialNumber', isoperation: false },
                { id: 1, title: '名称', name: 'name', isoperation: false },
                { id: 2, title: '规格', name: 'specifications', isoperation: false }
              ]
            },
            {
              id: 1,
              title: '配送中心信息',
              name: 'afterSales',
              children: [
                { id: 4, title: '联系方式', name: 'tel', isoperation: false },
                { id: 0, title: '序号', name: 'serialNumber', isoperation: false },
                { id: 1, title: '配送中心', name: 'center', isoperation: false },
                { id: 2, title: '总负责人', name: 'manage', isoperation: false }
              ]
            },
            {
              id: 2,
              title: '交通政策',
              name: 'trafficLook'
            }
          ]
        },
        {
          id: 1,
          title: '采购端',
          name: 'purchasing',
          isMore: false
        },
        {
          id: 2,
          title: '供应端',
          name: 'supply',
          isMore: true
        },
        {
          id: 3,
          title: '物流端',
          name: 'transport'

        },

        {
          id: 4,
          title: '信息共享端',
          name: 'informationSharingTerminal',
          isMore: false,
          children: [
            {
              id: 0,
              title: '库存情况',
              name: 'PartsNformation',
              children: [
                { id: 3, title: '库存量', name: 'inventoryNumber', isoperation: false },
                { id: 0, title: '序号', name: 'orderId', isoperation: false },
                { id: 1, title: '设备名称', name: 'equipmentName', isoperation: false },
                { id: 2, title: '备件类别', name: 'type', isoperation: false }

              ]
            },
            {
              id: 1,
              title: '采购情况',
              name: 'aSales',
              children: [
                { id: 5, title: '库存剩余', name: 'inventorySurplus', isoperation: false },
                { id: 0, title: '订单编号', name: 'orderId', isoperation: false },
                { id: 1, title: '采购预警', name: 'purchaseAlert', isoperation: false },
                { id: 2, title: '发出时间', name: 'time', isoperation: false },
                { id: 3, title: '备件名称', name: 'name', isoperation: false },
                { id: 4, title: '进货量', name: 'purchaseQuantity', isoperation: false }

              ]
            },
            {
              id: 2,
              title: '需求情况',
              name: 'demandSituation',
              children: [
                { id: 5, title: '处理情况', name: 'solution', isoperation: false },
                { id: 0, title: '订单编号', name: 'orderId', isoperation: false },
                { id: 1, title: '需求客户', name: 'purchaseAlert', isoperation: false },
                { id: 2, title: '所在区域', name: 'address2', isoperation: false },
                { id: 3, title: '备件名称', name: 'name', isoperation: false },
                { id: 4, title: '需求量', name: 'purchase', isoperation: false }

              ]
            },
            {
              id: 3,
              title: '车辆情况',
              name: 'vehicleCondition',
              children: [
                { id: 3, title: '可装载量', name: 'loadableCapacity', isoperation: false },
                { id: 0, title: '车辆编号', name: 'orderId', isoperation: false },
                { id: 1, title: '车辆情况', name: 'vehicleCondition', isoperation: false },
                { id: 2, title: '所处位置', name: 'location', isoperation: false }

              ]
            },
            {
              id: 4,
              title: '反馈处理情况',
              name: 'solutionqingk',
              children: [

                { id: 0, title: '反馈类别', name: 'question_type', isoperation: false },
                { id: 2, title: '客户名称', name: 'user_name', isoperation: false },
                { id: 1, title: '反馈时间', name: 'question_time', isoperation: false }
              ]
            }
          ]
        },
        {
          id: 5,
          title: '备件管理',
          name: 'manageStore',
          isMore: true
        }
      ]
    }
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // eslint-disable-next-line space-before-function-paren
    getActivePath (str, rootId, childId) {
      console.log(str)
      window.sessionStorage.setItem('menu_data', JSON.stringify(this.menu_data))
      window.sessionStorage.setItem('rootId', rootId)
      window.sessionStorage.setItem('childId', childId)
      console.log(JSON.parse(window.sessionStorage.getItem('menu_data')))
      // this.$router.push({
      //   path: str // 页面路劲 和上面名字任意一个都可以
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.container_top {
  height: 100%;
}
.el-aside {
  background-color: rgb(153,204,204);
  /deep/.el-menu {
    border-right: 0;
    width: 250px;
    background-color: rgb(153,204,204);
  }
  .el-menu {
    /deep/.menu-item {
    }
    .el-menu--inline,
    .menu-item,
    /deep/.el-submenu__title {
      background-color: rgb(153,204,204);

      color: #fff;
      font-size: 30px;
      margin: 20px 0;
    }
  }
}
.el-header {
  background-color: rgb(153,204,204);
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  .el-dropdown {
    padding: 0 10px;
    font-size: 25px;
  }
  span {
    font-size: 30px;
  }
  .el-button {
    background-color: rgb(4, 82, 65);
    color: #fff;
  }
}
.el-main {
  background-color: #eaedf1;
  padding: 40px;
}
</style>
