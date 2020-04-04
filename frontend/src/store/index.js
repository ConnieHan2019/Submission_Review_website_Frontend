import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {//响应式状态
    token: localStorage.getItem('token') || null,//若未定义则会返回undefined，||null则得到null
    userDetails: localStorage.getItem('userDetails') || null,
    admin: false
  },
  mutations: {
    login(state, data){
      localStorage.setItem('token', data.token)
      localStorage.setItem('userDetails', data.userDetails)
      state.userDetails = data.userDetails
      state.token = data.token
      if(data.hasOwnProperty("admin")){
        state.admin = true
      }
      else{
        state.admin = false
      }
    },
    logout(state) {
      // 移除token
      localStorage.removeItem('token')
      localStorage.removeItem('userDetails')
      state.userDetails = null
      state.token = null
      state.admin = false;
    }
  },
  actions: {
  }
})
