<template>
  <div>
    <el-row :gutter="20">
      <el-col :span='20'>
        <div class="label-warp">
          <label>关键字</label>
          <div class="warp-content">
            <el-row :gutter="20">
              <el-col :span="3">
                <el-select v-model="data.selectValue">
                  <el-option v-for="item in data.option" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-col>
              <el-col :span='4'>
                <el-input placeholder="请输入内容"></el-input>
              </el-col>
              <el-col :span="15">
                <el-button type="danger">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span='4'>
        <el-button type='danger' class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
    <div style="height: 30px"></div>
    <table-vue :config='data.configTable'/>
  </div>
</template>
<script>
import TableVue from '@/components/table/index.vue'
import { reactive } from '@vue/composition-api'
export default {
  components: {
    TableVue
  },
  setup(props) {
    const data = reactive({
      selectValue: '',
      option: [
        { value: 'name', label: '姓名'},
        { value: 'phone', label: '手机号'},
        { value: 'email', label: '邮箱'}
      ],
      configTable: {
        tHead:[
          {
            label: '邮箱/用户名',
            field: 'email'
          },
          {
            label: '真实姓名',
            field: 'name'
          },
          {
            label: '手机号',
            field: 'phone'
          },
          {
            label: '地区',
            field: 'address'
          },
          {
            label: '角色',
            field: 'role'
          }
        ],
        //翻页记录
        recordCheckbox: true
      }
    })
    return {
      data
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
.label-warp {
  @include labelDom(left,60,40)
}
</style>