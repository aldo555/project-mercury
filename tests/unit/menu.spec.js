import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Menu from '@/views/Menu.vue'
import Settings from '../../src/store/modules/settings.store.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Menu', () => {
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
 
  test('stats button is disabled', () => {
    const wrapper = shallowMount(Menu, { store, localVue })
    expect(wrapper.html()).toContain('<button disabled="disabled" class="bg-indigo-300 px-10 py-4 text-4xl uppercase rounded-lg text-indigo-100 max-w-xl w-full">Stats</button>')
  })

  test('play menu is be displayed after pressing the play button', async () => {
    const wrapper = shallowMount(Menu, { store, localVue })
    expect(wrapper.vm.isPlayMenuDisplayed).toBe(false)
    expect(wrapper.contains('#play-menu')).toBe(false)
    const playButton = wrapper.find('#play-button')
    playButton.trigger('click')
    await localVue.nextTick()
    expect(wrapper.contains('#play-menu')).toBe(true)
  })

  test('language and useAccents are returned from the store and displayed', async () => {
    const wrapper = shallowMount(Menu, { store, localVue })
    const playButton = wrapper.find('#play-button')
    playButton.trigger('click')
    await localVue.nextTick()
    expect(wrapper.vm.language).toBe('english')
    expect(wrapper.findAll('h2').at(0).text()).toBe('Language - english')
    expect(wrapper.vm.useAccents).toBe(false)
    expect(wrapper.findAll('h2').at(1).text()).toBe('Type with accents - False')
  })

  test('dispatches setLanguage action', async () => {
    const wrapper = shallowMount(Menu, { store, localVue })
    const playButton = wrapper.find('#play-button')
    playButton.trigger('click')
    await localVue.nextTick()
    const romanianLanguageButton = wrapper.findAll('button').at(2)
    romanianLanguageButton.trigger('click')
    expect(actions.setLanguage).toHaveBeenCalled()
  })

  test('dispatches setUseAccents action', async () => {
    const wrapper = shallowMount(Menu, { store, localVue })
    const playButton = wrapper.find('#play-button')
    playButton.trigger('click')
    await localVue.nextTick()
    const toggleAccentsButton = wrapper.findAll('button').at(4)
    toggleAccentsButton.trigger('click')
    expect(actions.setUseAccents).toHaveBeenCalled()
  })

  test('back button works', async () => {
    const wrapper = shallowMount(Menu, { store, localVue })
    const playButton = wrapper.find('#play-button')
    playButton.trigger('click')
    await localVue.nextTick()
    expect(wrapper.contains('#play-menu')).toBe(true)
    const backButton = wrapper.find('#back-button')
    backButton.trigger('click')
    await localVue.nextTick()
    expect(wrapper.contains('#play-menu')).toBe(false)
  })

  test('game is started when pressing start game', async () => {
    const wrapper = shallowMount(Menu, { store, localVue, mocks: {
      $router
    }})
    const playButton = wrapper.find('#play-button')
    playButton.trigger('click')
    await localVue.nextTick()
    const startGameButton = wrapper.find('#start-button')
    const spy = spyOn(wrapper.vm.$router, 'push');
    startGameButton.trigger('click')
    await localVue.nextTick()
    expect(spy).toHaveBeenCalledWith({ name: 'Game' }); 
  })
})
