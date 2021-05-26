import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    gags: null
  },
  mutations: {
    UPDATE_GAGS (state, payload) {
      state.gags = payload
    }
  },
  actions: {
    getGags ({ commit }) {
      axios.get('/gags')
        .then((response) => {
          commit('UPDATE_GAGS', response.data.results.reverse()) // reverse the array to change gags display order : LIFO
        })
        .catch((err) => { console.error(err) })
    }
  }
})
