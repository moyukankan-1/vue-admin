<template>
  <div :class="[menuStatus? 'close': 'open']">
    <layout-nav />
    <layout-header />
    <layout-main />
  </div>
</template>
<script>
import layoutHeader from './components/header.vue'
import layoutMain from './components/main.vue'
import layoutNav from './components/nav.vue'
import { computed } from '@vue/composition-api'

export default {
  components: {
    layoutHeader,
    layoutMain,
    layoutNav
  },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.isCollapse)

    return {
      menuStatus
    }
  }
}
</script>
<style lang="scss" scoped>
</style>