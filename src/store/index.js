import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse'))
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      //HTML5的本地存储
      window.sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    } 
  },
  actions: {
  },
  modules: {
  }
})
