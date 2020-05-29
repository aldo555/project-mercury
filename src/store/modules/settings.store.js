const initialState = () => ({
  language: 'english',
  useAccents: false,
  selectedDifficulty: 1, // the index of the difficulty
  difficulties: [
    {
      name: 'Easy',
      description: 'For people who never touched a keyboard before.',
      wordsToAddStartingPoint: 2,
      wordsToAddInterval: 3,
      addWordInterval: 60,
      intensityStartingPoint: 1,
      intensityIncreaseRate: 0.5,
      missesToLose: 10,
    },
    {
      name: 'Normal',
      description: 'Recommended difficulty for most people.',
      wordsToAddStartingPoint: 2,
      wordsToAddInterval: 2,
      addWordInterval: 60,
      intensityStartingPoint: 1,
      intensityIncreaseRate: 0.6,
      missesToLose: 7,
    },
    {
      name: 'Hard',
      description: 'Good luck! You\'re gonna need it.',
      wordsToAddStartingPoint: 3,
      wordsToAddInterval: 2,
      addWordInterval: 50,
      intensityStartingPoint: 1,
      intensityIncreaseRate: 0.6,
      missesToLose: 5,
    },
    {
      name: 'Insane',
      description: 'You better get ready for this.',
      wordsToAddStartingPoint: 3,
      wordsToAddInterval: 1,
      addWordInterval: 40,
      intensityStartingPoint: 1,
      intensityIncreaseRate: 0.7,
      missesToLose: 3,
    }
  ]
})

const state = initialState()

const getters = {
  getLanguage: state => state.language,
  getUseAccents: state => state.useAccents,
  getWordsToAddStartingPoint: state => state.difficulties[state.selectedDifficulty].wordsToAddStartingPoint,
  getWordsToAddInterval: state => state.difficulties[state.selectedDifficulty].wordsToAddInterval,
  getAddWordInterval: state => state.difficulties[state.selectedDifficulty].addWordInterval,
  getIntensityStartingPoint: state => state.difficulties[state.selectedDifficulty].intensityStartingPoint,
  getIntensityIncreaseRate: state => state.difficulties[state.selectedDifficulty].intensityIncreaseRate,
  getMissesToLose: state => state.difficulties[state.selectedDifficulty].missesToLose,
  getDifficulties: state => state.difficulties,
  getSelectedDifficulty: state => state.selectedDifficulty
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
  setWordsToAddInterval: ({ commit }, newValue) => {
    commit('SET_WORDS_TO_ADD_INTERVAL', newValue)
  },
  setAddWordInterval: ({ commit }, newValue) => {
    commit('SET_ADD_WORD_INTERVAL', newValue)
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
  // add difficulty action for custom difficulties
  setSelectedDifficulty: ({ commit }, newValue) => {
    commit('SET_SELECTED_DIFFICULTY', newValue)
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
  SET_WORDS_TO_ADD_INTERVAL: (state, newValue) => {
    state.wordsToAddInterval = newValue
  },
  SET_ADD_WORD_INTERVAL: (state, newValue) => {
    state.addWordInterval = newValue
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
  //add dificulty mutation for custom difficulties
  SET_SELECTED_DIFFICULTY: (state, newValue) => {
    state.selectedDifficulty = newValue
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
