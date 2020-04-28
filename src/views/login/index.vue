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
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
          <label>确认密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()">获取验证码</el-button>
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
import { GetSms } from '@/api/login'
import { reactive, ref, onMounted } from '@vue/composition-api'
import {stripscript} from '@/utils/validate'
export default {
  setup(props,context) {
    //验证用户名
      let validateUsername = (rule, value, callback) => {
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
      let validatePassword = (rule, value, callback) => {
        // 过滤去密码特殊字符
        ruleForm.password = stripscript(value)
        value = ruleForm.password

        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码!'));
        } else if (!reg.test(value)) {
          callback(new Error('密码为6-20位数字加字母!'));
        } else {
          callback();
        }
      }
      //验证确认密码
      let validatePasswords = (rule, value, callback) => {
        //过滤去确认密码特殊字符
        ruleForm.passwords = stripscript(value)
        value = ruleForm.passwords

        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请再次输入密码!'));
        } else if (value != ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      //验证验证码
      let checkCode = (rule, value, callback) => {
        //过滤去验证码特殊字符
        ruleForm.code = stripscript(value)
        value = ruleForm.code

        let reg = /^[a-z0-9]{6}$/
        if (value === '') {
          return callback(new Error('请输入验证码!'));
        } else if (!reg.test(value)) {
          callback(new Error('验证码格式有误!'));
        } else {
          callback();
        }
      }
    //这里放置data数据，生命周期，自定义函数
    // context.attrs
    // context.slots
    // context.parent
    // context.root
    // context.emit

    //遇到声明类型为对象类型的时候，用reactive
    const menuTab = reactive([{txt: "登录",current: true,type:'login'},{txt: "注册",current: false,type:'register'}])
    //遇到声明类型为基本类型的时候，用ref
    const model = ref('login')
    //表单绑定数据
    const ruleForm = reactive({
      username: '',
      password: '',
      passwords: '',
      code: ''
    })
    //表单的验证
    const rules = reactive({
      username: [
        { validator: validateUsername, trigger: 'blur' }
      ],
      password: [
        { validator: validatePassword, trigger: 'blur' }
      ],
      passwords: [
        { validator: validatePasswords, trigger: 'blur' }
      ],
      code: [
        { validator: checkCode, trigger: 'blur' }
      ]
    })

    /*
    声明周期
    */ 
    //挂载
    onMounted(() => {})

    /**
     * 声明函数
     */
    const toggleMenu = (data => {
      menuTab.forEach(element => {
        element.current = false
      });
      data.current = true
      //修改模块值
      model.value = data.type
    }) 
    /**
     * 获取验证码
     */
    const getSms = (() => {
      GetSms()
    })
    /*
     *提交表单
    */
    const submitForm = (formName => {
      context.refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }) 
    return {
      menuTab,
      model,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSms
    }
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