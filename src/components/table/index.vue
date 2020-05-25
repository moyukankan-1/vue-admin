<template>
  <el-table :data="data.tableData" border style="width: 100%">
    <el-table-column type='selection' width='55'></el-table-column>
    <template v-for="item in data.tableConfig.tHead">
      <!-- v-slot -->
      <el-table-column :key="item.id" :prop="item.field" :label="item.label" v-if="item.columnType == 'slot'">
        <template slot-scope='scope'>
          <slot :name="item.slotName" :data='scope.row'></slot>
        </template>
      </el-table-column>
      <!--文本渲染-->
      <el-table-column :key="item.id" :prop="item.field" :label="item.label" v-else></el-table-column>
    </template>
  </el-table>
</template>
<script>
import { reactive, onBeforeMount } from '@vue/composition-api'
export default {
  props: ['config'],
  setup(props) {
    const data = reactive({
      tableData:[
        {
          email: '2020-03-01',
          name: '张三',
          phone: '1358846542',
          address: '广东少',
          role: '超管'
        }
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