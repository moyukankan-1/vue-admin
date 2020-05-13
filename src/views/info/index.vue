<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型：</label>
          <div class="wrap-content">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-wrap date">
          <label for="">日期：</label>
          <div class="wrap-content">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-work">
          <label for="">关键字：</label>
          <div class="wrap-content">
            <el-select v-model="search">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="search_input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%;">搜索</el-button>
      </el-col>
      <el-col :span="2" class="pull-right">
        <el-button type="danger" style="width: 100%;" @click="dialogInfo = true">新增</el-button>
      </el-col>
    </el-row>
    <div style="height: 30px"></div>
    <!--表格-->
    <el-table :data="tableData.item" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="130"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="235"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem">删除</el-button>
          <el-button type="success" size="mini" @click="dialogInfo = true">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 30px"></div>
    <!--底部分页-->
    <el-row>
      <el-col :span="12">
        <el-button @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="total, sizes, prev, pager, next"
          :page-sizes="[10, 20, 30, 40]"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <!--弹窗-->
    <Dialog :flag.sync="dialogInfo" :category="options.category"/>
  </div>
</template>
<script>
import Dialog from '@/components/dialog/index.vue'
import { ref, reactive, onMounted, watch } from '@vue/composition-api'
import { common } from '@/api/common'
import { GetList } from '@/api/news'
export default {
  components: {
    Dialog
  },
  setup(props,{ root }) {
        const { getInfoCategory, categoryItem } = common()
        const options = reactive({
          category: []
        })
        const searchOptions = reactive([{
          value: 'id',
          label: 'ID'
        }, {
          value: 'title',
          label: '标题'
        }])
        const tableData = reactive({
          item: []
        })
        const page = reactive({
          pageNumber: 1,
          pageSize: 10
        })
        const value = ref('')
        const value2 = ref('')
        const search = ref('id')
        const search_input = ref('')
        const dialogInfo = ref(false)
        const total = ref(0)  //默认数量

        const handleSizeChange = (val) => {
          page.pageSize = val
          getList()
        }
        const handleCurrentChange = (val) => {
          page.pageNumber = val
          getList()
        }
        const deleteItem = () => {
         root.confirm({
           content: '确认删除当前信息，确认后将无法恢复！',
           type: '警告',
           fn: confirmDelete
         })
        }
        const deleteAll = () => { 
          root.confirm({
            content: '删除全部，是否继续？',
            fn: confirmDelete
          })
        }
        const confirmDelete = () => {
          console.log(11)
        }

        /**
         * 获取分类
         */
        onMounted(() =>{
          getInfoCategory()
          getList()
        })
        /**
         * watch
         */
        watch(() => categoryItem.item, (value) => {
          options.category = value
        })
        /**
         * 获取列表
         */
        const getList = () => {
          let requestData = {
            categoryId: '',
            startTime: '',
            endTime: '',
            title: '',
            id: '',
            pageNumber: page.pageNumber,
            pageSize: 10
          }
          GetList(requestData).then(res => {
            tableData.item = res.data.data.data
            total.value = res.data.data.total
          }).catch(err => {})
        }
        return {
          handleSizeChange,
          handleCurrentChange,
          deleteItem,
          deleteAll,
          options,
          searchOptions,
          tableData,
          value,
          value2,
          search,
          total,
          page,
          search_input,
          dialogInfo,
        }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.label-wrap {
  &.category { @include labelDom(left, 60, 40)}
  &.date { @include labelDom(right, 95, 40)}
  &.key-work { @include labelDom(right, 100, 40)}
}

</style>