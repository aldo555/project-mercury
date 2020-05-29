const initialState = () => ({
  menuAudio: new Audio(require('@/assets/menu.wav')),
  backgroundMusic: new Audio(require('@/assets/background.wav')),
  playMusic: new Audio(require('@/assets/play.wav')),
  menuVolume: 0.6,
  backgroundVolume: 0.3,
  playVolume: 0.3,
})

const state = initialState()

const getters = {
  getMenuAudio: state => state.menuAudio,
  getBackgroundMusic: state => state.backgroundMusic,
  getPlayMusic: state => state.playMusic,
  getMenuVolume: state => state.menuVolume,
  getBackgroundVolume: state => state.backgroundVolume,
  getPlayVolume: state => state.playVolume,
}

const actions = {
  setMenuVolume: ({ commit }, newValue) => {
    commit('SET_MENU_VOLUME', newValue)
  },
  setBackgroundVolume: ({ commit }, newValue) => {
    commit('SET_BACKGROUND_VOLUME')
  },
  setPlayVolume: ({ commit }, newValue) => {
    commit('SET_PLAY_VOLUME', newValue)
  },
  init: ({ commit }) => {
    commit('INIT')
  },
  resetVolume: ({ commit }) => {
    commit('RESET_VOLUME')
  }
}

const mutations = {
  SET_MENU_VOLUME: (state, newValue) => {
    state.menuVolume = newValue
    state.menuAudio.volume = newValue
  },
  SET_BACKGROUND_VOLUME: (state, newValue) => {
    state.backgroundVolume = newValue
    state.backgroundMusic.volume = newValue
  },
  SET_PLAY_VOLUME: (state, newValue) => {
    state.playVolume = newValue
    state.playMusic.volume = newValue
  },
  INIT: (state) => {
    const newState = initialState()
    Object.keys(newState).forEach(key => {
      if (key == 'menuVolume' || key == 'backgroundVolume' || key == 'playVolume') {
        return
      }

      state[key] = newState[key]
    })

    state.menuAudio.volume = state.menuVolume
    state.backgroundMusic.loop = true
    state.backgroundMusic.volume = state.backgroundVolume
    state.playMusic.loop = true
    state.playMusic.volume = state.playVolume
  },
  RESET_VOLUME: (state) => {
    const newState = initialState()
    state.menuVolume = newState.menuVolume
    state.menuAudio.volume = newState.menuVolume
    state.backgroundVolume = newState.backgroundVolume
    state.backgroundMusic.volume = newState.backgroundVolume
    state.playVolume = newState.playVolume
    state.playMusic.volume = newState.playVolume
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
