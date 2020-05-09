<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogFlag" center :modal-append-to-body='false' @close="close" width="580px">
      <el-form :model="form">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="概括" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="dialogFlag = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ref, reactive, watch } from '@vue/composition-api'
export default {
  props: ['flag'],
  setup(props,{ emit }) {
    const dialogFlag = ref(false)
    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''      
    })
    const formLabelWidth= ref('70px')

    watch(() => dialogFlag.value = props.flag)
    const close = () => {
      emit("update:flag", false)
      //需要处理逻辑的时候，不能用修饰器
      // emit('close', false)
    }
    return {
      dialogFlag,
      close,
      form,
      formLabelWidth
    }
  }
  
}
</script>
<style lang="scss" scoped>
</style>