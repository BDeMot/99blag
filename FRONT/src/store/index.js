import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gags: null
  },
  mutations: {
    UPDATE_GAGS (state, payload) {
      state.gags = payload
      console.log(state.gags[2].date)
    }
  },
  actions: {
    getGags ({ commit }) {
      axios.get('/gags')
        .then((response) => {
          commit('UPDATE_GAGS', response.data.results.reverse()) // reverse the array to change display order : LIFO
        })
        .catch((err) => { console.error(err) })
    }
  }
})
