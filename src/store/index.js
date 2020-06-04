import Vue from 'vue'
import Vuex from 'vuex'
import { Login } from '@/api/login'
import { setToken, setUsername } from '../utils/app'
import cookie from 'cookie_js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')),
    to_ken: "",
    username: cookie.get('username')
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      //HTML5的本地存储
      window.sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state,value) {
      state.to_ken = value
    },
    SET_USERNAME(state,value) {
      state.username = value
    }
  },
  actions: {
    login({ commit },data) {
      return new Promise((resolve,reject) => {
        Login(data).then(res => {
          let result = res.data.data
          commit('SET_TOKEN',result.token)
          commit('SET_USERNAME',result.username)
          setToken(result.token)
          setUsername(result.username)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})
