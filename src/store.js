import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: 'Chat-App',
    user: null
  },
  mutations: {
    SetUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    SignIn ({commit}, payload) {
      commit('SetUser', {name: payload})
    }
  }
})
