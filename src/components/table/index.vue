<template>
  <div>
    <el-table :data="data.tableData" border style="width: 100%" @selection-change="thatSelectCheckbox">
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
    <div class="table-footer">
      <el-row>
        <el-col :span="4">
          <slot name="tableFooterLeft"></slot>
        </el-col>
        <el-col :span="20">
          <el-pagination
            class="pull-right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, onBeforeMount, ref } from '@vue/composition-api'
import { GetUserList } from '@/api/news'
export default {
  props: ['config','tableRow'],
  setup(props,{ root, emit}) {
    const data = reactive({
      tableData:[
      ],
      tableConfig: {
        tHead: [],
        //翻页记录
        recordCheckbox: false,
        requestUrl: ''
      }
    })
    const total = ref(0)

    let loadData = () => {
      console.log(data.tableConfig.requestUrl)
    }

    /**
     * 初始化table配置项
     */
    let initTableConfig = () => {
      let keys = Object.keys(data.tableConfig)
      for(let key in props.config) {
        if(keys.includes(key)) {
          data.tableConfig[key] = props.config[key]
        }
      }
    }

    const getUserList = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 10
      }
      GetUserList(requestData).then(res => {
        data.tableData = res.data.data.data
        total.value = res.data.data.total
      })
    }

    const thatSelectCheckbox = (val) => {
      let rowData = {
        idItem: val.map(item => item.id)
      }
      emit('update:tableRow',rowData)
    }

    const handleSizeChange = () => {}
    const handleCurrentChange = () => {}

    onBeforeMount(() => {
      initTableConfig()
      loadData(),
      getUserList()
    })

    return {
      data,
      thatSelectCheckbox,
      getUserList,
      total,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>
<style lang="scss" scoped>
</style>