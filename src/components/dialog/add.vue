<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialogFlag" center :modal-append-to-body='false' @close="close" width="650px" @opened="openDialog">
      <el-form :model="form" ref="addInform">
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <city-picker />
        </el-form-item>
        <el-form-item label="是否启用：" :label-width="formLabelWidth">
          <el-radio v-model="roleStatus" label="1">禁用</el-radio>
          <el-radio v-model="roleStatus" label="2">启用</el-radio>
        </el-form-item>
        <el-form-item label="角色：" :label-width="formLabelWidth">
          <el-checkbox-group v-model="roleCode">
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
import { ref, reactive, watch, onMounted } from '@vue/composition-api'
import { AddInfo, GetRole } from '@/api/news'
import cityPicker from '@/components/cityPicker/index.vue'
export default {
  props: ['flag','category'],
  components: {
    cityPicker
  },
  setup(props,{ root, emit }) {
    const dialogFlag = ref(false)
    const form = reactive({
      category: '',
      title: '',
      content: ''    
    })
    //是否启用状态
    const roleStatus = ref('1')
    //角色
    const roleCode  = reactive([
      'A','B'
    ])
    const roleItem = reactive({
      item: []
    })
    const categoryOption = reactive({
      item: []
    })
    const formLabelWidth= ref('90px')

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
      categoryOption.item = props.category
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
      let requestData = {
        category: form.category,
        title: form.title,
        content: form.content
      }
      if(!form.category) {
        root.$message({
          message: '分类不能为空!',
          type: 'error'
        })
        return
      }
      submitLoading.value = true
      AddInfo(requestData).then(res => {
        root.$message({
          message: res.data.message,
          type: 'success'
        })
        submitLoading.value = false
        //重置表单
        resetForm()
      }).catch(err => {
        submitLoading.value = false
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
      categoryOption,
      formLabelWidth,
      openDialog,
      submit,
      roleStatus,
      roleCode,
      roleItem
    }
  }
  
}
</script>
<style lang="scss" scoped>
</style>