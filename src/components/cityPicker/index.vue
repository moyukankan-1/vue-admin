<template>
  <div style="overflow: hidden">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-select v-model="form.provinceValue" @change="handlerProvince">
          <el-option v-for="item in data.provinceData" :key="item.PROVINCE_ID" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="form.cityValue" @change="handlerCity">
          <el-option v-for="item in data.cityData" :key="item.CITY_ID" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="form.areaValue" @change="handlerArea">
          <el-option v-for="item in data.areaData" :key="item.AREA_ID" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="form.streetValue">
          <el-option v-for="item in data.streetData" :key="item.STREET_ID" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { GetCityPicker } from '@/api/news'
import { onMounted, reactive, watch } from '@vue/composition-api'
export default {
  setup(props,{ emit }) {
    const data = reactive({
      provinceData: [],
      cityData: [],
      areaData: [],
      streetData: []
    })
    const form = reactive({
      provinceValue: '',
      cityValue: '',
      areaValue: '',
      streetValue: '',
    })
    /**
     * 获取省份
     */
    const getProvince = () => {
      getData({type: 'province'})
    }
    /**
     * 选择省份，获取城市
     */
    const handlerProvince = (val) => {
      resetValue({type: 'city'})
      getData({type: 'city', province_code: val})
    }
    /**
     * 选择城市，获取区县
     */
    const handlerCity = (val) => {
      resetValue({type: 'area'})
      getData({type: 'area', city_code: val})
    }
    /**
     * 选择区县，获取街道
     */
    const handlerArea = (val) => {
      resetValue({type: 'street'})
      getData({type: 'street', area_code: val})
    }
    /**
     * 获取数据
     */
     const getData = (requestData) => {
       GetCityPicker(requestData).then(res => {
         data[`${requestData.type}Data`] = res.data.data.data
       })
     }
     watch([
       () => form.provinceValue,
       () => form.cityValue,
       () => form.areaValue,
       () => form.streetValue,
     ],([province,city,area,street]) => {
       emit('update:cityPickerData',form)
     }
     )
    /**
     * 重置选项
     */
    const resetValue = (params) => {
      const valueJson = {
        city: ['cityValue','areaValue','streetValue'],
        area: ['areaValue','streetValue'],
        street: ['streetValue'],
      }
      valueJson[params.type].forEach(item => {
        data[item] = ''
      })
    }


    onMounted(() => {
      //获取省份
      getProvince()
    })
    

    return {
      data,
      handlerProvince,
      handlerCity,
      handlerArea,
      form
    }
  }
}
</script>
<style lang="scss" scoped>
</style>