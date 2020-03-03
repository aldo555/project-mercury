import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Game from '@/views/Game.vue'
import Settings from '../../src/store/modules/settings.store.js'
import 'jest-canvas-mock'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Game', () => {
  let state
  let actions
  let store
  let $router = {
    push: jest.fn()
  }

  beforeEach(() => {
    state = {
      language: 'english',
      useAccents: false
    }

    actions = {
      setLanguage: jest.fn(),
      setUseAccents: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        Settings: {
          namespaced: true,
          state,
          actions,
          getters: Settings.getters
        }
      }
    })
  })
 
  test('game options received from store', () => {
    const wrapper = shallowMount(Game, { store, localVue })
    expect(wrapper.vm.language).toBe('english')
    expect(wrapper.vm.useAccents).toBe(false)
    expect(wrapper.vm.wordsToAddStartingPoint).toBe(2)
    expect(wrapper.vm.intensityStartingPoint).toBe(1)
    expect(wrapper.vm.intensityIncreaseRate).toBe(0.1)
    expect(wrapper.vm.missesToLose).toBe(5)
  })
})
