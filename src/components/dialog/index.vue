<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialogFlag" center :modal-append-to-body='false' @close="close" width="580px" @opened="openDialog">
      <el-form :model="form" ref="addInform">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option v-for="item in categoryOption.item" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="概括" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off"></el-input>
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
import { ref, reactive, watch } from '@vue/composition-api'
import { AddInfo } from '@/api/news'
export default {
  props: ['flag','category'],
  setup(props,{ root, emit }) {
    const dialogFlag = ref(false)
    const form = reactive({
      category: '',
      title: '',
      content: ''    
    })
    const categoryOption = reactive({
      item: []
    })
    const formLabelWidth= ref('70px')

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
    return {
      dialogFlag,
      submitLoading,
      close,
      form,
      categoryOption,
      formLabelWidth,
      openDialog,
      submit
    }
  }
  
}
</script>
<style lang="scss" scoped>
</style>