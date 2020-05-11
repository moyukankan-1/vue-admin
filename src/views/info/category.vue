<template>
  <div id="category">
    <el-button size="mini" type="danger" @click="addFirst">添加一级分类</el-button>
    <hr class="line"/>
    <div>
      <el-row :span="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{firstItem.category_name}}
                <div class="button-group">
                  <el-button size="mini" round type="danger">编辑</el-button>
                  <el-button size="mini" round type="success">添加子级</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
                </h4>
              <ul v-if="firstItem.children">
                <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                  {{childrenItem.category_name}}
                  <div class="button-group">
                    <el-button size="mini" round type="danger">编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编译</h4>
          <el-form label-width="142px" ref="ruleForm">
            <el-form-item label="一级分类名称：" v-if="category_first">
              <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" v-if="category_sec">
              <el-input v-model="form.secCategoryName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submit" :loading="sumbit_loading">确定</el-button>
            </el-form-item>
          </el-form>           
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from '@vue/composition-api'
import { AddFristCategory, GetCategory } from '@/api/news'
export default {
  setup(props, { root, refs }) {
    const form = reactive({
      categoryName: '',
      secCategoryName: '',
    })
    const category = reactive({
      item: []
    })
    const category_first = ref(true)
    const category_sec = ref(true)
    //loading状态
    const sumbit_loading = ref(false)
    /**
     * 添加
     */
    const submit = () => {
      if(!form.categoryName) {
        root.message({
          message: '分类名称不能为空!',
          type: 'error'
        })
        return false
      }
      //按钮加载状态
      sumbit_loading.value = true
      AddFristCategory({categoryName: form.categoryName}).then(res => {
        if(res.data.resCode == 0) {
          root.$message({
            message: res.data.message,
            type: "success"
          })
          category.item.push(res.data.data)
        }
        sumbit_loading.value = false
        //清除表单
        form.categoryName = ''
        form.secCategoryName = ''
      }).catch(err => {
        sumbit_loading.value = false
        //清除表单
        form.categoryName = ''
        form.secCategoryName = ''
      })
    }
    const addFirst = () => {
      category_first.value = true
      category_sec.value = false
    }
    /**
     * 获取分类
     */
    const getCategory = () => {
      GetCategory({}).then(res => {
        category.item = res.data.data.data
      }).catch(err => {}) 
    }

    /**
     * 生命周期 vue3.0语法
     * 挂载完成时执行,(页面dom元素完成时)
     */
    onMounted(() => {
      getCategory()
    })

    return {
      form,
      submit,
      addFirst,
      category_first,
      category_sec,
      category,
      sumbit_loading
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.category-wrap div:first-child {
  &:before {
    top: 20px;
  }
}
.category-wrap div:last-child {
  &:before {
    bottom: 21px;
  }
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: '';
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 30px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 14px;
    top: 14px;
    font-size: 17px;
    background: #fff;
    color: #000;
  }
  li {
    position: relative;
    list-style: none;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,h4 {
    @include webkit(transition, all .3s);
    &:hover {
      background: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
  .button-group {
    display: none;
    font-size: 12px;
    position: absolute;
    top: -1px;
    right: 10px;
  }
}
.menu-title {
  line-height: 44px;
  background: #f3f3f3;
  padding-left: 20px;
}
.el-form-item {
  width: 410px;
  padding-top: 25px;
}
.line {
  margin: 30px -30px;
}
</style>