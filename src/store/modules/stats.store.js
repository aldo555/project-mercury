const initialState = () => ({
  results: [],
})

const state = initialState()

const getters = {
  getResults: state => state.results,
  getLongestGame: state => state.results.reduce((prev, current) => (prev.timeElapsed > current.timeElapsed) ? prev : current).timeElapsed,
  getAverageWpm: state => Math.floor(state.results.reduce((total, next) => total + next.wpm, 0) / state.results.length),
  getAverageAccuracy: state => Math.floor(state.results.reduce((total, next) => total + next.accuracy, 0) / state.results.length)
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
