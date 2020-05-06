<template>
  <div>
    <layout-nav />
    <layout-header />
    <layout-main />
  </div>
</template>
<script>
import layoutHeader from './components/header.vue'
import layoutMain from './components/main.vue'
import layoutNav from './components/nav.vue'

export default {
  components: {
    layoutHeader,
    layoutMain,
    layoutNav
  },
  setup() {

  }
}
</script>
<style lang="scss" scoped>
</style>