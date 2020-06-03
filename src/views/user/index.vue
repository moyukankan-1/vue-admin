<template>
  <div>
    <el-row :gutter="20">
      <el-col :span='20'>
        <div class="label-warp">
          <label>关键字</label>
          <div class="warp-content">
            <el-row :gutter="20">
              <el-col :span="3">
                <el-select v-model="data.selectValue" @change="select">
                  <el-option v-for="item in data.option" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-col>
              <el-col :span='4'>
                <el-input placeholder="请输入内容" v-model="data.key_word"></el-input>
              </el-col>
              <el-col :span="15">
                <el-button type="danger" @click="search">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span='4'>
        <el-button type='danger' class="pull-right" @click="data.dialogAdd = true">添加用户</el-button>
      </el-col>
    </el-row>
    <div style="height: 30px"></div>
    <table-vue :config='data.configTable' :tableRow.sync="data.tableRow" ref="userTable">
      <template v-slot:status='slotData'>
        <el-switch
          @change="handleSwitch(slotData.slotData)"
          v-model="slotData.slotData.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="2"
          inactive-value="1">
        </el-switch>
      </template>
      <template v-slot:operation='slotData'>
        <el-button size="small" type="danger" @click="handlerDel(slotData.data)">删除</el-button>
        <el-button size="small" type="success" @click="handleEdit(slotData.slotData)">编辑</el-button>
      </template>
      <template v-slot:tableFooterLeft>
        <el-button size="small" @click="batchDel">批量删除</el-button>
      </template>
    </table-vue>
    <Dialog :flag.sync="data.dialogAdd" :editData="data.editData" @refreshData='refreshData'/>
  </div>
</template>
<script>
import TableVue from '@/components/table/index.vue'
import Dialog from '@/components/dialog/add.vue'
import { reactive, ref } from '@vue/composition-api'
import { UserDel, UserActives } from '@/api/news'
export default {
  components: {
    TableVue,
    Dialog
  },
  setup(props, { root, refs }) {
    const data = reactive({
      selectValue: '',
      option: [
        { value: 'name', label: '姓名'},
        { value: 'phone', label: '手机号'}
      ],
      configTable: {
        tHead:[
          {
            label: '邮箱/用户名',
            field: 'username'
          },
          {
            label: '真实姓名',
            field: 'truename'
          },
          {
            label: '手机号',
            field: 'phone'
          },
          {
            label: '地区',
            field: 'region'
          },
          {
            label: '角色',
            field: 'role'
          },
          {
            label: '禁启用状态',
            field: 'status',
            columnType: 'slot',
            slotName: 'status'
          },
          {
            label: '操作',
            columnType: 'slot',
            slotName: 'operation'
          }
        ],
        //翻页记录
        recordCheckbox: true,
        //请求接口url
        requestUrl: '/news/getList/'
      },
      dialogAdd: false,
      tableRow: {},
      timer: null,
      editData: {},
      selectData: {},
      //搜索关键字  
      key_word: ''
    })
    //单点删除
    const handlerDel = (params) => {
      root.confirm({
        content: '确认删除当前信息，确认后将无法恢复！',
        type: '警告',
        fn: confirmDelete
      })
      data.tableRow.idItem = [params.id]
      userDel()
    }
    //批量删除
    const batchDel = () => {
      let userId = data.tableRow.idItem
      if(!userId || userId.length == 0) {
        root.$message({
          message: '请勾选想要删除的用户!',
          type: 'error'
        })
        return 
      }
      root.confirm({
        content: '确认删除当前信息，确认后将无法恢复！',
        type: '警告',
        fn: confirmDelete
      })
      userDel()
    }
    //删除用户
    const userDel = () => {
      UserDel({id: data.tableRow.idItem}).then(res => {
      }).catch(err => {})
    }
    //刷新数据
    const confirmDelete = () => {
      //刷新数据
      refs.userTable.getUserList()
    }
    const refreshData = () => {
      confirmDelete()
    }

    const handleSwitch = (params) => {
      let requestData = {
        id: params.id,
        status: params.status
      }
      if(data.timer) {
        clearTimeout(data.timer)
      }
      data.timer = setTimeout(() => {
        UserActives(requestData).then(res => {
          root.$message({
            message: res.data.message,
            type: 'success'
          })
        }).catch(err => {})
      },300)
    }

    //编辑
    const handleEdit = (params) => {
      data.dialogAdd = true
      data.editData = Object.assign({}, params)
    }
    //选择触发
    const select = (val) => {
      data.selectData = data.option.filter(item => item.value == val)[0]
    }

    //搜索触发
    const search = () => {
      let loadData = {
        [data.selectData.value]: data.key_word
      }
      refs.userTable.paramsLoadDta(loadData)
    }
    
    return {
      data,
      handlerDel,
      batchDel,
      refreshData,
      handleSwitch,
      handleEdit,
      select,
      search
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