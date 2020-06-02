<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialogFlag" center :modal-append-to-body='false' @close="close" width="650px" @opened="openDialog">
      <el-form :model="form" ref="addInform">
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="form.username" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input v-model="form.truename" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input v-model.number="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <city-picker :cityPickerData.sync="form.region"/>
        </el-form-item>
        <el-form-item label="是否启用：" :label-width="formLabelWidth">
          <el-radio v-model="form.roleStatus" label="1">禁用</el-radio>
          <el-radio v-model="form.roleStatus" label="2">启用</el-radio>
        </el-form-item>
        <el-form-item label="角色：" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.role">
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
import { GetRole, UserAdd } from '@/api/news'
import cityPicker from '@/components/cityPicker/index.vue'
export default {
  props: ['flag','category'],
  components: {
    cityPicker
  },
  setup(props,{ root, emit }) {
    const dialogFlag = ref(false)
    const form = reactive({
      username: '',
      truename: '',
      password: '',
      phone: '',
      region: {},
      roleStatus: '1',
      role: []
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
    }
    //重置表单
    const resetForm = () => {
      form.category = ''
      form.title = ''
      form.content = ''
    }
    const submit = () => {
      if(!form.username) {
        root.$message({
          message: '用户名不能为空!',
          type: 'error'
        })
        return
      }
      if(!form.password) {
        root.$message({
          message: '密码不能为空!',
          type: 'error'
        })
        return
      }
      if(form.role.length == 0) {
        root.$message({
          message: '请选择角色类型!',
          type: 'error'
        })
        return
      }
      
      let requestData = Object.assign({},form)
      requestData.role = requestData.role.join()
      requestData.region = JSON.stringify(form.region)
      requestData.password = sha1(requestData.password)
      UserAdd(requestData).then(res => {
        root.$message({
          message: data.message,
          type: 'success'
        })
        resetForm()
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
      roleItem
    }
  }
  
}
</script>
<style lang="scss" scoped>
</style>