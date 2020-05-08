<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型：</label>
          <div class="wrap-content">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
        <el-button type="danger" style="width: 100%;">新增</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="cate" label="类别" width="130"></el-table-column>
      <el-table-column prop="date" label="日期" width="235"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { ref, reactive } from '@vue/composition-api'
export default {
  setup(props) {
        const options = reactive([{
          value: 1,
          label: '国际信息'
        }, {
          value: 2,
          label: '国内信息'
        }, {
          value: 3,
          label: '行业信息'
        }])
        const searchOptions = reactive([{
          value: 'id',
          label: 'ID'
        }, {
          value: 'title',
          label: '标题'
        }])
        const tableData = reactive([{
          title: 'hahahahahahaha',
          cate: '国内信息',
          date: '2020-01-08 19:33:20',
          user: '管理员'
        },{
          title: 'zazazazazazazazazazazaz',
          cate: '国内信息',
          date: '2020-01-08 19:33:20',
          user: '管理员'
        },{
          title: 'kakakakakakak',
          cate: '国内信息',
          date: '2020-01-08 19:33:20',
          user: '管理员'
        },{
          title: 'lalalalalalalalalalalal',
          cate: '国内信息',
          date: '2020-01-08 19:33:20',
          user: '管理员'
        }])
        const value = ref('')
        const value2 = ref('')
        const search = ref('id')
        const search_input = ref('')
        return {
          options,
          searchOptions,
          tableData,
          value,
          value2,
          search,
          search_input
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