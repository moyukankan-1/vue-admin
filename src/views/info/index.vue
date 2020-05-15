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
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-button type="danger" style="width: 100%;" @click="grabble">搜索</el-button>
      </el-col>
      <el-col :span="2" class="pull-right">
        <el-button type="danger" style="width: 100%;" @click="dialogInfo = true">新增</el-button>
      </el-col>
    </el-row>
    <div style="height: 30px"></div>
    <!--表格-->
    <el-table :data="tableData.item" border style="width: 100%" @selection-change="handleSelectionChange" v-loading="loadingData">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="130" :formatter="toCate"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="235" :formatter="toData"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
          <el-button type="success" size="mini" @click="editInfo(scope.row.id)">编辑</el-button>
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

    <!--新增弹窗-->
    <Dialog :flag.sync="dialogInfo" :category="options.category"/>
    <!--编辑弹窗-->
    <DialogEdit :flag.sync="dialogInfoEdit" :id="editId" :category="options.category" @getListEmit="getList"/>
  </div>
</template>
<script>
import Dialog from '@/components/dialog/index.vue'
import DialogEdit from '@/components/dialog/edit.vue'
import { ref, reactive, onMounted, watch } from '@vue/composition-api'
import { common } from '@/api/common'
import { GetList, DeleteInfo } from '@/api/news'
import { timestampToTime } from '@/utils/date'
export default {
  components: {
    Dialog,
    DialogEdit
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
        const dialogInfoEdit = ref(false)
        const total = ref(0)  //默认数量
        const loadingData = ref(false)
        const deleteInfoId = ref('')
        const editId = ref('')

        const handleSizeChange = (val) => {
          page.pageSize = val
          getList()
        }
        const handleCurrentChange = (val) => {
          page.pageNumber = val
          getList()
        }
        /**
         * 删除信息
         */
        const deleteItem = (id) => {
          deleteInfoId.value = [id]
          root.confirm({
           content: '确认删除当前信息，确认后将无法恢复！',
           type: '警告',
           fn: confirmDelete
          })
        }
        const deleteAll = () => { 
          if(!deleteInfoId.value || deleteInfoId.value.length == 0) {
            root.$message({
              message: '请选择要删除的数据',
              type: 'error'
            })
            return
          }
          root.confirm({
            content: '删除全部，是否继续？',
            fn: confirmDelete
          })
        }
        const confirmDelete = () => {
          DeleteInfo({id: deleteInfoId.value}).then(res => {
            root.$message({
              message: res.data.message,
              type: 'success'
            })
            deleteInfoId.value = ''
            getList()
          }).catch(err => {

          })
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
         * 搜索
         */
        const grabble = () => {
          getList()
        }
        /**
         * 单独处理数据
         */
        const formData = () => {
          let requestData = {
            pageNumber: page.pageNumber,
            pageSize: 10
          }
          //分类id
          if(value.value) {
            requestData.categoryId = value.value
          }
          //日期
          if(value2.value.length > 0) {
            requestData.startTime = value2.value[0]
            requestData.endTime = value2.value[1]
          }
          //关键字
          if(search_input.value) {
            requestData[search.value] = search_input.value
          }
          return requestData
        }
        /**
         * 获取列表
         */
        const getList = () => {
          let requestData = formData()
          //加载状态
          loadingData.value = true
          GetList(requestData).then(res => {
            tableData.item = res.data.data.data
            total.value = res.data.data.total
            //加载状态
            loadingData.value = false
          }).catch(err => {
            //加载状态
            loadingData.value = false
          })
        }

        //时间戳转化
        const toData = (row, column, cellValue, index) => {
          return timestampToTime(row.createDate)
        }
        //类型转化
        const toCate = (row, column, cellValue, index) => {
          let data = options.category.filter(item => item.id == row.categoryId)[0]
          return data.category_name
        }

        const handleSelectionChange = (val) => {
          let id = val.map(item => item.id)
          deleteInfoId.value = id
        }

        const editInfo = (id) => {
          editId.value = id
          dialogInfoEdit.value = true
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
          dialogInfoEdit,
          loadingData,
          toData,
          toCate,
          getList,
          handleSelectionChange,
          grabble,
          editInfo,
          editId
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