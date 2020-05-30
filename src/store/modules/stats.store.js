const initialState = () => ({
  results: [],
})

const state = initialState()

const getters = {
  getResults: state => state.results,
}

const actions = {
  addNewResult: ({ commit }, result) => {
    commit('ADD_NEW_RESULT', result)
  },
  reset: ({ commit }) => {
    commit('RESET')
  }
}

const mutations = {
  ADD_NEW_RESULT: (state, result) => {
    state.results.push(result)
  },
  RESET: (state) => {
    const newState = initialState()
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
