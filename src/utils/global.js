import { MessageBox } from 'element-ui'

export default {
  install (Vue,options) {
    Vue.prototype.confirm = (params) => {
      MessageBox.confirm(params.content, params.type || '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(params.fn) {
          params.fn()
        }
      }).catch(() => {
      })
    }
  }
}