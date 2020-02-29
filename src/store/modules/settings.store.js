const initialState = () => ({
  language: 'english',
  useAccents: false,
  wordsToAddStartingPoint: 2,
  intensityStartingPoint: 1,
  intensityIncreaseRate: 0.1,
  missesToLose: 5
  // difficulty settings
})

const state = initialState()

const getters = {
  getLanguage: state => state.language,
  getUseAccents: state => state.useAccents,
  getWordsToAddStartingPoint: state => state.wordsToAddStartingPoint,
  getIntensityStartingPoint: state => state.intensityStartingPoint,
  getIntensityIncreaseRate: state => state.intensityIncreaseRate,
  getMissesToLose: state => state.missesToLose
}

const actions = {
  setLanguage: ({ commit }, newValue) => {
    commit('SET_LANGUAGE', newValue)
  },
  setUseAccents: ({ commit }, newValue) => {
    commit('SET_USE_ACCENTS', newValue)
  },
  setWordsToAddStartingPoint: ({ commit }, newValue) => {
    commit('SET_WORDS_TO_ADD_STARTING_POINT', newValue)
  },
  setIntensityStartingPoint: ({ commit }, newValue) => {
    commit('SET_INTESITY_STARTING_POINT', newValue)
  },
  setIntensityIncreaseRate: ({ commit }, newValue) => {
    commit('SET_INTENSITY_INCREASE_RATE', newValue)
  },
  setMissesToLose: ({ commit }, newValue) => {
    commit('SET_MISSES_TO_LOSE', newValue)
  },
  reset: ({ commit }) => {
    commit('RESET')
  }
}

const mutations = {
  SET_LANGUAGE: (state, newValue) => {
    state.language = newValue
  },
  SET_USE_ACCENTS: (state, newValue) => {
    state.useAccents = newValue
  },
  SET_WORDS_TO_ADD_STARTING_POINT: (state, newValue) => {
    state.wordsToAddStartingPoint = newValue
  },
  SET_INTENSITY_STARTING_POINT: (state, newValue) => {
    state.intensityStartingPoint = newValue
  },
  SET_INTENSITY_INCREASE_RATE: (state, newValue) => {
    state.intensityIncreaseRate = newValue
  },
  SET_MISSES_TO_LOSE: (state, newValue) => {
    state.missesToLose = newValue
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
