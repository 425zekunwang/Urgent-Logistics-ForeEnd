<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/images/logo.jpg">
      </div>
      <div class="login_title">
        Modern Intelligence Emergency Logistics System <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;
        现代智能应急物流系统
      </div>

      <el-form :model="LoginForm"
               :rules="login_form"
               class="login_form"
               ref="resetLoginForm">
        <el-form-item prop="username">
          <el-input v-model="LoginForm.username"
                    placeholder="请输入用户名"
                    prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="LoginForm.password"
                    placeholder="请输入密码"
                    prefix-icon="iconfont icon-3702mima"
                    type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="buttonBox">
            <div class="b1">
              <el-button type="primary"
                         @click="isShow4 = true">反馈中心</el-button>
            </div>
            <div class="btns">
              <el-button type="primary"
                         @click="login">登录</el-button>
              <el-button type="info"
                         @click="resetLoginForm">重置</el-button>
            </div>

          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="客户反馈意见收集栏"
               :visible.sync="isShow4"
               width="30%"
               center
               :before-close="handleClose">
      <el-form ref="form"
               :model="form"
               label-width="80px">

        <el-form-item label="反馈类型">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="订单响应度"
                         name="type"></el-checkbox>
            <el-checkbox label="缺货/少货"
                         name="type"></el-checkbox>
            <el-checkbox label="运输服务"
                         name="type"></el-checkbox>
            <el-checkbox label="货物损坏"
                         name="type"></el-checkbox>
            <el-checkbox label="其他"
                         name="type">
              <el-input v-model="form.name"></el-input>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="反馈内容">
          <el-input type="textarea"
                    v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item prop="username"
                      label="真实姓名">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="tel"
                      label="手机号码">
          <el-input placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="tel"
                      label="电子邮箱">
          <el-input placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="isShow4 = false; isShow5 = true">立即创建</el-button>
          <el-button @click="isShow4 = false">取消</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">

        <el-button type="primary"
                   @click="isShow4 = false">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="感谢信"
               :visible.sync="isShow5"
               width="30%"
               center
               :before-close="handleClose">
      <div class="dialogBox d2">
        <div class="item">
          您好，感谢您的宝贵建议，我们会将您的反馈记录下来提供给相关部门，非常感谢您对我们的关注和支持，我们会尽快完善
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">

        <el-button type="primary"
                   @click="isShow5 = false">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      isShow4: false,
      isShow5: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      LoginForm: {
      },
      login_form: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在6到16个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.resetLoginForm.resetFields()
    },
    // login () {
    //   if (this.$data.LoginForm.username !== 'admin' || this.$data.LoginForm.password !== '123456') return this.$message.error('登录失败')
    //   this.$message.success('登录成功')
    //   this.$router.push('/home', () => { })
    // },
    login () {
      const that = this
      that.$axios(
        {
          method: 'post',
          url: that.$api + '/user/login',
          withCredentials: true,
          data: {
            name: this.$data.LoginForm.username,
            pwd: this.$data.LoginForm.password
          }
        }).then(res => {
        if (res.data.flag) {
          console.log(res.data)
          this.$message.success('登录成功')
          this.$router.push('/home', () => { })
        } else {
          this.$message.success('登陆失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #CCFFFF;
  height: 100%;
}
.login_box {
  background-color: #CCFFAA;
  width: 500px;
  height: 300px;
  border-radius: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    //border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    top:-20%;
    transform: translate(-50%, -60%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_title {
    position: absolute;
    left: 15%;
    font-size: 15px;
    transform: translate(3%, 0%);
    //border: 1px solid #eee;
    //box-shadow: 0 0 10px #ddd;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.buttonBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .b1 {
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
