<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialogFlag" center :modal-append-to-body='false' @close="close" width="650px" @opened="openDialog">
      <el-form :model="form.data" ref="addInform" :rules="rules">
        <el-form-item label="用户名：" :label-width="formLabelWidth" prop='username'>
          <el-input v-model="form.data.username" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop='password'>
          <el-input type="password" v-model="form.data.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth" prop="truename">
          <el-input v-model="form.data.truename" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
          <el-input v-model.number="form.data.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth" prop="region">
          <city-picker :cityPickerData.sync="form.data.region"/>
        </el-form-item>
        <el-form-item label="是否启用：" :label-width="formLabelWidth" prop="status">
          <el-radio v-model="form.data.roleStatus" label="1">禁用</el-radio>
          <el-radio v-model="form.data.roleStatus" label="2">启用</el-radio>
        </el-form-item>
        <el-form-item label="角色：" :label-width="formLabelWidth" prop="role">
          <el-checkbox-group v-model="form.data.role">
            <el-checkbox v-for="item in roleItem.item" :key="item.role" :label="item.role">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" :loading="submitLoading" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import sha1 from 'js-sha1'
import { ref, reactive, watch, onMounted } from '@vue/composition-api'
import { GetRole, UserAdd, UserEdit } from '@/api/news'
import cityPicker from '@/components/cityPicker/index.vue'
import { stripscript } from '@/utils/validate'
export default {
  props: ['flag','editData'],
  components: {
    cityPicker
  },
  setup(props,{ root, emit, refs }) {
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
      if(form.data.id && !value) {
        callback()
      }
      if((form.data.id && value) || !form.data.id) {
        // 过滤去密码特殊字符
        if(value) {
          form.data.password = stripscript(value)
          value = form.data.password
        }
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码!'));
        } else if (!reg.test(value)) {
          callback(new Error('密码为6-20位数字加字母!'));
        } else {
          callback();
        }
      }
      // 过滤去密码特殊字符
      if(value) {
        form.data.password = stripscript(value)
        value = form.data.password
      }
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
      if (value === '') {
        callback(new Error('请输入密码!'));
      } else if (!reg.test(value)) {
        callback(new Error('密码为6-20位数字加字母!'));
      } else {
        callback();
      }
    }
    const dialogFlag = ref(false)
    const form = reactive({
      data: {
        username: '',
        truename: '',
        password: '',
        phone: '',
        region: {},
        roleStatus: '1',
        role: []
      }
    })
    //表单的验证
    const rules = reactive({
      username: [
        { validator: validateUsername, trigger: 'blur' }
      ],
      password: [
        { validator: validatePassword, trigger: 'blur' }
      ],
      role: [
        { required: true, message: '请选择角色！', trigger: 'blur' }
      ]
    })
    const formLabelWidth = ref('90px')
    const roleItem = reactive({
      item: []
    })
    
    const submitLoading = ref(false)

    watch(() => dialogFlag.value = props.flag)
    const close = () => {
      emit("update:flag", false)
      //需要处理逻辑的时候，不能用修饰器
      // emit('close', false)
      resetForm()
    }
    //打开对话框之后
    const openDialog = () => {
      //打开请求角色接口
      getRole()
      //初始值处理
      //如果id存在是编辑模式
      let editData = props.editData
      if(editData.id) {
        editData.role = editData.role.split(',')
        //循环遍历
        for(let key in editData) {
          form.data[key] = editData[key]
        }
      }else {  //添加  如果先点击编辑 form里面会存在一个id 需要删掉
        form.data.id && delete form.data.id
      }
      
    }
    //重置表单
    const resetForm = () => {
      refs.addInform.resetFields()
    }
    const submit = () => {
      refs.addInform.validate((valid) => {
        if (valid) {
          let requestData = Object.assign({},form.data)
          requestData.role = requestData.role.join()
          requestData.region = JSON.stringify(form.data.region)
          
          if(requestData.id) {
            //编辑
             if(requestData.password) {
               requestData.password = sha1(requestData.password)
             }else {
               delete requestData.password
             }
             UserEdit(requestData).then(res => {
              root.$message({
                message: res.data.message,
                type: 'success'
              })
              close()
              emit('refreshData')
            })
          }else {
            //添加
            requestData.password = sha1(requestData.password)
            UserAdd(requestData).then(res => {
              root.$message({
                message: res.data.message,
                type: 'success'
              })
              close()
              emit('refreshData')
            })
          }
        } else {}
      })
    }
    /**
     * 请求角色
     */
    const getRole = () => {
      GetRole().then(res => {
        roleItem.item = res.data.data
      }).catch(err => {})
    }
    return {
      dialogFlag,
      submitLoading,
      close,
      form,
      formLabelWidth,
      openDialog,
      submit,
      roleItem,
      rules
    }
  }
  
}
</script>
<style lang="scss" scoped>
</style>