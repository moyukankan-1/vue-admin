import { GetCategory, GetCategoryAll } from '@/api/news'
import { reactive } from '@vue/composition-api'
export function common() {
  const categoryItem = reactive({
    item: []
  })
  /**
   * 获取分类
   */
  const getInfoCategory = () => {
    GetCategory({}).then(res => {
      categoryItem.item = res.data.data.data
    }).catch(err => {})
  }

  /**
   * 获取全部分类
   */
  const getInfoCategoryAll = () => {
    GetCategoryAll({}).then(res => {
      categoryItem.item = res.data.data
    }).catch(err => {})
  }
  return {
    getInfoCategory,
    getInfoCategoryAll,
    categoryItem
  }
}