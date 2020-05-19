<template>
  <div id="nav-wrap">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="transparent" text-color="#fff" router>
      <template v-for="(item,index) in routers">
        <el-submenu v-if="item.hidden" :key="index" :index="index + ''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-menu-item :key="subItem.id" v-if="!subItem.hidden" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from '@vue/composition-api'
export default {
  setup(props, { root }) {
    const isCollapse =  computed(() => root.$store.state.isCollapse)
    const routers = reactive(root.$router.options.routes)
    
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }

    return {
      isCollapse,
      handleOpen,
      handleClose,
      routers
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background: #344a5f;
  @include webkit(transition, all .5s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: 65px;
  }
}
</style>