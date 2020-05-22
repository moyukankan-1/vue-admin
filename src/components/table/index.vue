<template>
  <el-table :data="data.tableData" border style="width: 100%">
    <el-table-column type='selection' width='55'></el-table-column>
    <el-table-column v-for="item in data.tableConfig.tHead" :key="item.id" :prop="item.field" :label="item.label"></el-table-column>
  </el-table>
</template>
<script>
import { reactive, onBeforeMount } from '@vue/composition-api'
export default {
  props: ['config'],
  setup(props) {
    const data = reactive({
      tableData:[
        {}
      ],
      tableConfig: {
        tHead: [],
        //翻页记录
        recordCheckbox: false
      }
    })

    onBeforeMount(() => {
      data.tableConfig.tHead = props.config.tHead
    })

    return {
      data
    }
  }
}
</script>
<style lang="scss" scoped>
</style>