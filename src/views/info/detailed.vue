<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="信息分类：">
      <el-select v-model="form.categoryId">
        <el-option v-for="item in data.category" :key="item.id" :value="item.id" :label="item.category_name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题：">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图：">
      缩略图
    </el-form-item>
    <el-form-item label="发布日期：">
      <el-date-picker
        v-model="form.date"
        type="date"
        placeholder="选择日期"
        disabled>
      </el-date-picker>
    </el-form-item>
    <el-form-item label="详细内容：">
      <quill-editor v-model="form.content" ref="myQuillEditor" :options='data.editorOption'/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" :loading="data.submitLoading">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { common } from '@/api/common'
import { reactive, onMounted , watch } from '@vue/composition-api'
import { GetList, EditInfo } from '@/api/news'
import { timestampToTime } from '@/utils/date'


import { quillEditor } from "vue-quill-editor" //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor
  },
  setup(props,{ root }) {
    const { getInfoCategory, categoryItem } = common()
    const data = reactive({
      id: root.$route.query.id,
      category: [],
      editorOption: {},
      submitLoading: false
    })
    const form = reactive({
      categoryId: '',
      title: '',
      date: '',
      content: ''
    })

    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: data.id
      }
      GetList(requestData).then(res => {
        let data = res.data.data.data[0]
        form.categoryId = data.categoryId
        form.title = data.title
        form.date = timestampToTime(data.createDate)
        form.content = data.content
      }).catch(err => {})
    }

    const submit = () => {
      let requestData = {
        id: data.id,
        categoryId: form.categoryId,
        title: form.title,
        content: form.content
      }
      data.submitLoading = true
      if(!form.categoryId) {
        root.$message({
          message: '分类不能为空!',
          type: 'error'
        })
        return
      }
      EditInfo(requestData).then(res => {
        root.$message({
          message: res.data.message,
          type: 'success'
        })
        data.submitLoading = false
      }).catch(err => {
      })
    }

    watch(() => categoryItem.item, (value) => {
      data.category = value
    }) 

    onMounted(() => {
      getInfoCategory(),
      getInfo()
    })
       

    return {
      form,
      data,
      submit
    }
  }
}
</script>
<style lang="scss" scoped>
</style>