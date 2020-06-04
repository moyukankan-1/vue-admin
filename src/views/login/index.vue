<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{current: item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">
          {{item.txt}}
        </li>
      </ul>
      <!--表单-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-if="model === 'register'">
          <label>确认密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input type="text" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus">{{codeButtonText}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block" :disabled="loginButtonStatus">{{model == "login"? '登录': '注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import { GetSms, Register, Login } from '@/api/login'
import { reactive, ref, onMounted } from '@vue/composition-api'
import {stripscript} from '@/utils/validate'
export default {
  setup(props,{refs, root}) {
    //验证用户名
      let validateUsername = (rule, value, callback) => {
        let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
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

    const menuTab = reactive([{txt: "登录",current: true,type:'login'},{txt: "注册",current: false,type:'register'}])
    const model = ref('login')
    //登录按钮禁用状态
    const loginButtonStatus = ref(true)
    //验证码按钮禁用状态
    const codeButtonStatus = ref(false)
    const codeButtonText = ref('获取验证码')
    //倒计时时间
    const timer = ref(null)
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
     * 切换模块
     */
    const toggleMenu = (data) => {

      menuTab.forEach(element => {
        element.current = false
      });
      data.current = true
      //修改模块值
      model.value = data.type
      //重置表单
      refs.loginForm.resetFields()
      clearCountDown()
    }
    /**
     * 更新按钮状态
     */
    const updataButtonStatus = ((params) => {
      codeButtonStatus.value = params.status
      codeButtonText.value  = params.text
    })
    /**
     * 获取验证码
     */
    const getSms = (() => {
      //邮箱为空时，提示
      if(ruleForm.username == '') {
        root.$message.error('邮箱不能为空!')
        return
      }
      let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
      if(!reg.test(ruleForm.username)) {
        root.$message.error('邮箱格式有误，请重新输入!')
        return
      }

      //修改获取验证按钮的状态
      updataButtonStatus({
        status: true,
        text: '已发送'
      })
      //请求接口
      GetSms({username: ruleForm.username, module: model.value}).then(response => {
        root.$message({
          message: response.data.message,
          type: 'success'
        })
        loginButtonStatus.value = false
        countDown(60)
      }).catch(error => {
        console.log(error)
      })
    })
    /*
     * 倒计时 
     */
    const countDown = ((number) => {
      // 判断定时器是否存在
      if(timer.value) {
        clearInterval(timer.value)
      }
      let time = number
      timer.value = setInterval(() => {
        time--
        if(time === 0) {
          clearInterval(timer.value)
          updataButtonStatus({
            status: false,
            text: '再次获取'
          })
        }else {
          codeButtonText.value = `倒计时${time}`
        }
      }, 1000);
    })
    /**
     * 点击注册，清除倒计时
     */
    const clearCountDown = (() => {
      updataButtonStatus({
        status: false,
        text: '获取验证码'
      })
      clearInterval(timer.value)
    })
    /*
     *提交表单
    */
    const submitForm = (formName => {
      refs[formName].validate((valid) => {
        if (valid) {
          if(model.value == 'login') {
            login()
          }else {
            register()
          }
        } else {
          return false;
        }
      })
    }) 
    /**
     * 登录接口
     */
    const login = (() => {
      let data = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
      }
      root.$store.dispatch('login', data).then(res => {
        root.$message({
          message: res.data.message,
          type: 'success'
        })
        root.$router.push('/backstage')
      }).catch(err => {})
    }) 
    /**
     * 注册接口
     */
    const register = (() => {
      let data = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: 'register'
      }
      Register(data).then(response => {
        root.$message({
          message: response.data.message,
          type: 'success'
        })
        //注册成功
        toggleMenu(menuTab[0])
        clearCountDown()
      }).catch(error => {
      })
    })
    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      codeButtonText,
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