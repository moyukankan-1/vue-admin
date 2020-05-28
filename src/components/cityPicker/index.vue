<template>
  <div style="overflow: hidden">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-select v-model="data.provinceValue" @change="handlerProvince">
          <el-option v-for="item in data.provinceData" :key="item.PROVINCE_ID" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="data.cityValue" @change="handlerCity">
          <el-option v-for="item in data.cityData" :key="item.CITY_ID" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="data.areaValue" @change="handlerArea">
          <el-option v-for="item in data.areaData" :key="item.AREA_ID" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="data.streetValue">
          <el-option v-for="item in data.streetData" :key="item.STREET_ID" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { GetCityPicker } from '@/api/news'
import { onMounted, reactive } from '@vue/composition-api'
export default {
  setup(props) {
    const data = reactive({
      provinceValue: '',
      cityValue: '',
      areaValue: '',
      streetValue: '',
      provinceData: [],
      cityData: [],
      areaData: [],
      streetData: []
    })
    /**
     * 获取省份
     */
    const getProvince = () => {
      GetCityPicker({type: 'province'}).then(res => {
        data.provinceData = res.data.data.data
      })
    }
    /**
     * 选择省份，获取城市
     */
    const handlerProvince = (val) => {
      data.cityValue = ''
      data.areaValue = ''  
      data.streetValue = ''
      GetCityPicker({type: 'city', province_code: val}).then(res => {
        data.cityData = res.data.data.data
      })
    }
    /**
     * 选择城市，获取区县
     */
    const handlerCity = (val) => {
      data.areaValue = ''
      GetCityPicker({type: 'area', city_code: val}).then(res => {
        data.areaData = res.data.data.data
      })
    }
    /**
     * 选择区县，获取街道
     */
    const handlerArea = (val) => {
      data.streetValue = ''
      GetCityPicker({type: 'street', area_code: val}).then(res => {
        data.streetData = res.data.data.data
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
      handlerArea
    }
  }
}
</script>
<style lang="scss" scoped>
</style>