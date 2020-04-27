<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{current: item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">
          {{item.txt}}
        </li>
      </ul>
      <!--表单-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
          
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      //验证用户名
      var validateUsername = (rule, value, callback) => {
        let reg = /^([a-zA-Z]|(0-9))(\w|\.)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        if (value === '') {
          callback(new Error('请输入用户名!'))
        } else if(!reg.test(value)) {
          callback(new Error('用户名格式错误!'))
        }else {
          callback()
        }
      }
      //验证密码
      var validatePassword = (rule, value, callback) => {
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\s{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码!'));
        } else if (!reg.test(value)) {
          callback(new Error('密码为6-20位数字加字母!'));
        } else {
          callback();
        }
      }
      //验证验证码
      var checkCode = (rule, value, callback) => {
        let reg = /^[a-z0-9]{6}$/
        if (value === '') {
          return callback(new Error('请输入验证码!'));
        } else if (!reg.test(value)) {
          callback(new Error('验证码格式有误!'));
        } else {
          callback();
        }
        
      }
    return {
      menuTab: [ {txt: "登录",current: true},{txt: "注册",current: false} ],
      ruleForm: {
          username: '',
          password: '',
          code: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          code: [
            { validator: checkCode, trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach(element => {
        element.current = false
      });
      data.current = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  margin: 0;
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    line-height: 36px;
  }    
}
.current {
  background: rgba(0,0,0,.1);
}
.login-form {
  margin-top: 30px;
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 15px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 20px;
  }
}
</style>