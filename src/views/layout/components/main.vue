<template>
  <div id="main-wrap">
    <router-view />
  </div>
</template>
<script>
export default {
  setup(props) {

  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#main-wrap {
  position: fixed;
  left: $navMenu;
  top: 75px;
  right: 0;
  bottom: 0;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  padding: 30px;
  @include webkit(transition, all .5s);
}
.open {
  #main-wrap {
    left: $navMenu;
  }
}
.close {
  #main-wrap {
    left: $navMenuMin;
  }
}
</style>