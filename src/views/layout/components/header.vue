<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu"></svg-icon></div>
    <div class="pull-right">
      <div class="user-info">
        {{username}}
      </div>
      <svg-icon class="header-icon" iconClass="out" className="out"></svg-icon>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from '@vue/composition-api'
export default {
  setup(props, { root }) {
    const username = computed(() => root.$store.state.username)
    const navMenuState = () => {
      root.$store.commit('SET_COLLAPSE') 
    }
    return {
      navMenuState,
      username
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#header-wrap {
  position: fixed;
  top: 0;
  left: $navMenu;
  right: 0;
  height: 75px;
  line-height: 75px;
  background: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0,0,0,.1));
  @include webkit(transition, all .5s);
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    font-size: 26px;
  }
}
</style>