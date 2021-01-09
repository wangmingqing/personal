import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    opened: true
  },
  mutations: {
    TOGGLE_OPENED(state) {
      state.opened = !state.opened
    }
  },
  actions: {
    toggleOpened({commit}) {
      commit('TOGGLE_OPENED')
    }
  },
  modules: {
  }
})
