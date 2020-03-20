import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const store = () =>
  new Vuex.Store({
    plugins: [
      store => {
        store.subscribe((mutation, state) => {
          // console.log(mutation, state.token)
        })
      }
    ],
    state,
    getters,
    mutations,
    actions
  })

export default store
