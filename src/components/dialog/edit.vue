<template>
  <div>
    <el-dialog title="修改" :visible.sync="dialogFlag" center :modal-append-to-body='false' @close="close" width="580px" @opened="openDialog">
      <el-form :model="form" ref="addInform">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="form.item.category" placeholder="请选择活动区域">
            <el-option v-for="item in categoryOption.item" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.item.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="概括" :label-width="formLabelWidth">
          <el-input v-model="form.item.content" autocomplete="off"></el-input>
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
import { AddInfo, GetList, EditInfo } from '@/api/news'
export default {
  props: ['flag','category','id'],
  setup(props,{ root, emit }) {
    const dialogFlag = ref(false)
    const form = reactive({
      item: {
        category: '',
        title: '',
        content: '' 
      }   
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
      console.log(props.id)
      categoryOption.item = props.category
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: props.id
      }
      GetList(requestData).then(res => {
        let data = res.data.data.data[0]
        form.item = {
          category: data.categoryId,
          title: data.title,
          content: data.content
        }
      }).catch(err => {

      })
    }
    //重置表单
    const resetForm = () => {
      form.item.category = ''
      form.item.title = ''
      form.item.content = ''
    }
    const submit = () => {
      let requestData = {
        id: props.id,
        categoryId: form.item.category,
        title: form.item.title,
        content: form.item.content
      }
      if(!form.item.category) {
        root.$message({
          message: '分类不能为空!',
          type: 'error'
        })
        return
      }
      submitLoading.value = true
      EditInfo(requestData).then(res => {
        root.$message({
          message: res.data.message,
          type: 'success'
        })
        submitLoading.value = false
        emit("getListEmit")
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