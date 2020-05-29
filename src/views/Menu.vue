<template>
  <div>
    <div v-if="!isPlayMenuDisplayed" class="flex flex-col justify-center items-center min-h-screen px-4">
      <img class="max-w-xl w-full mb-16" src="../assets/logo.svg">
      <button id="play-button" @click="togglePlayMenu(); playMenuSound()" class="transition ease-in-out duration-150 font-medium bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500 px-10 py-4 mb-8 text-4xl uppercase rounded text-white max-w-xl w-full">Play</button>
      <router-link :to="{ name: 'Stats' }" @click.native="playMenuSound()" class="transition ease-in-out duration-150 font-medium bg-gradient-r-blue-800 bg-blue-900 hover:bg-blue-800 px-10 py-4 mb-8 text-4xl uppercase rounded text-white max-w-xl w-full text-center">
        Stats
      </router-link>
    </div>
    <div id="play-menu" v-if="isPlayMenuDisplayed" class="flex flex-col w-full mb-8 p-8">
      <button id="back-button" @click="playMenuSound(); togglePlayMenu()" class="max-w-xl w-full transition ease-in-out duration-150 text-blue-700 hover:text-blue-600 mb-16 text-2xl capitalize text-left">&lsaquo; Back</button>
      <h2 class="text-left text-blue-200 text-2xl font-bold capitalize">Language</h2>
      <div class="my-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div :class="[ language == 'english' ? 'bg-gradient-r-orange-300 bg-orange-500' : ' bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500' ]" @click="selectLanguage('english'); playMenuSound()" class="transition ease-in-out duration-150 cursor-pointer overflow-hidden shadow rounded card-notched relative overflow-hidden">
          <div class="px-4 py-8 sm:p-10">
            <div>
              <div class="text-3xl leading-9 text-white uppercase">
                English
              </div>
              <div class="leading-5 mt-1 absolute flag-position">
                <svg class="w-40 h-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#012169" d="M0 0h512v512H0z"/><path fill="#FFF" d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z"/><path fill="#C8102E" d="M184 324l11 34L42 512H0v-3l184-185zm124-12l54 8 150 147v45L308 312zM512 0L320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z"/><path fill="#FFF" d="M176 0v512h160V0H176zM0 176v160h512V176H0z"/><path fill="#C8102E" d="M0 208v96h512v-96H0zM208 0v512h96V0h-96z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div :class="[ language == 'swedish' ? 'bg-gradient-r-orange-300 bg-orange-500' : ' bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500' ]" @click="selectLanguage('swedish'); playMenuSound()" class="transition ease-in-out duration-150 cursor-pointer overflow-hidden shadow rounded card-notched relative overflow-hidden">
          <div class="px-4 py-8 sm:p-10">
            <div>
              <div class="text-3xl leading-9 text-white uppercase">
                Swedish
              </div>
              <div class="leading-5 mt-1 absolute flag-position">
                <svg class="w-40 h-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#066aa7" d="M0 0h512v512H0z"/><path fill="#fecc00" d="M0 204.8h512v102.4H0z"/><path fill="#fecc00" d="M134 0h102.4v512H134z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div :class="[ language == 'russian' ? 'bg-gradient-r-orange-300 bg-orange-500' : ' bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500' ]" @click="selectLanguage('russian'); playMenuSound()" class="transition ease-in-out duration-150 cursor-pointer overflow-hidden shadow rounded card-notched relative overflow-hidden">
          <div class="px-4 py-8 sm:p-10">
            <div>
              <div class="text-3xl leading-9 text-white uppercase">
                Russian
              </div>
              <div class="leading-5 mt-1 absolute flag-position">
                <svg class="w-40 h-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h512v512H0z"/><path fill="#0039a6" d="M0 170.7h512V512H0z"/><path fill="#d52b1e" d="M0 341.3h512V512H0z"/></g></svg>
              </div>
            </div>
          </div>
        </div>
        <div :class="[ language == 'bulgarian' ? 'bg-gradient-r-orange-300 bg-orange-500' : ' bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500' ]" @click="selectLanguage('bulgarian'); playMenuSound()" class="transition ease-in-out duration-150 cursor-pointer overflow-hidden shadow rounded card-notched relative overflow-hidden">
          <div class="px-4 py-8 sm:p-10">
            <div>
              <div class="text-3xl leading-9 text-white uppercase">
                Bulgarian
              </div>
              <div class="leading-5 mt-1 absolute flag-position">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-40 h-40" viewBox="0 0 512 512"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#d62612" d="M0 341.3h512V512H0z"/><path fill="#fff" d="M0 0h512v170.7H0z"/><path fill="#00966e" d="M0 170.7h512v170.6H0z"/></g></svg>
              </div>
            </div>
          </div>
        </div>
        <div :class="[ language == 'romanian' ? 'bg-gradient-r-orange-300 bg-orange-500' : ' bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500' ]" @click="selectLanguage('romanian'); playMenuSound()" class="transition ease-in-out duration-150 cursor-pointer overflow-hidden shadow rounded card-notched relative overflow-hidden">
          <div class="px-4 py-8 sm:p-10">
            <div>
              <div class="text-3xl leading-9 text-white uppercase">
                Romanian
              </div>
              <div class="leading-5 mt-1 absolute flag-position">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-40 h-40" viewBox="0 0 512 512"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#00319c" d="M0 0h170.7v512H0z"/><path fill="#ffde00" d="M170.7 0h170.6v512H170.7z"/><path fill="#de2110" d="M341.3 0H512v512H341.3z"/></g></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="text-left text-blue-200 text-2xl font-bold capitalize mt-8">Difficulty</h2>
      <div>
        <div class="my-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div v-for="(difficulty, index) in difficulties" :key="index" @click="selectDifficulty(index); playMenuSound()" :class="[ selectedDifficultyName == difficulty.name ? 'bg-gradient-r-orange-300 bg-orange-500' : ' bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500' ]" class="transition ease-in-out duration-150 cursor-pointer overflow-hidden shadow rounded card-notched relative overflow-hidden">
            <div class="px-4 py-8 sm:p-10">
              <div>
                <div class="text-3xl leading-9 text-white uppercase">
                  {{ difficulty.name }}
                </div>
                <div class="leading-5 mt-1 text-blue-100">
                  {{ difficulty.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center mb-24">
        <div>
          <h2 class="text-left text-blue-200 text-2xl font-bold mt-8">Type with Accents</h2>
          <small class="text-base text-blue-300 text-center mb-4">Not applicable for English</small>
        </div>
        <span class="relative z-0 inline-flex shadow-sm">
          <button :class="[ useAccents ? 'bg-gradient-r-orange-400 bg-orange-500' : ' bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500' ]" @click="toggleAccents(true); playMenuSound()" class="relative inline-flex items-center transition ease-in-out duration-150 px-6 py-3 mb-8 text-2xl uppercase text-white rounded-tl rounded-bl">
            On
          </button>
          <button :class="[ !useAccents ? 'bg-gradient-r-orange-400 bg-orange-500' : ' bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500' ]" @click="toggleAccents(false); playMenuSound()" class="button-notched -ml-px relative inline-flex items-center px-6 py-3 mb-8 text-2xl uppercase text-white uppercase rounded-br rounded-tr">
            Off
          </button>
        </span>
      </div>
      
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <button id="start-button" @click="playMenuSound(); startGame()" class="transition ease-in-out duration-150 font-medium bg-orange-600 hover:bg-orange-400 bg-gradient-r-orange-400 px-10 py-4 text-4xl uppercase rounded text-white w-full">Start</button>
      </div>
    </div>

    <volume></volume>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Volume from '@/components/Volume'

export default {
  name: 'Menu',
  components: {
    Volume
  },
  data () {
    return {
      isPlayMenuDisplayed: false,
      canStart: false,
      showVolumeModal: false,
    }
  },
  computed: {
    ...mapGetters({
      language: 'Settings/getLanguage',
      useAccents: 'Settings/getUseAccents',
      difficulties: 'Settings/getDifficulties',
      selectedDifficulty: 'Settings/getSelectedDifficulty',
      playMusic: 'Music/getPlayMusic',
      menuAudio: 'Music/getMenuAudio',
      backgroundMusic: 'Music/getBackgroundMusic',
    }),
    selectedDifficultyName () {
      return this.difficulties[this.selectedDifficulty].name
    },
    menuVolume: {
      get() {
        return this.$store.state.Music.menuVolume;
      },
      set(value) {
        this.$store.commit('Music/SET_MENU_VOLUME', value);
      },
    },
    backgroundVolume: {
      get() {
        return this.$store.state.Music.backgroundVolume;
      },
      set(value) {
        this.$store.commit('Music/SET_BACKGROUND_VOLUME', value);
      },
    },
    playVolume: {
      get() {
        return this.$store.state.Music.playVolume;
      },
      set(value) {
        this.$store.commit('Music/SET_PLAY_VOLUME', value);
      },
    },
  },
  created () {
    if (this.backgroundMusic.paused) {
      this.init()
      this.backgroundMusic.play()
    }
  },
  methods: {
    ...mapActions({
      selectLanguage: 'Settings/setLanguage',
      toggleAccents: 'Settings/setUseAccents',
      selectDifficulty: 'Settings/setSelectedDifficulty',
      init: 'Music/init',
      resetVolume: 'Music/resetVolume'
    }),
    togglePlayMenu () {
      this.isPlayMenuDisplayed = !this.isPlayMenuDisplayed
    },
    startGame () {
      this.canStart = true
      this.$router.push({ name: 'Game' })
      this.backgroundMusic.pause()
      this.playMusic.play()
    },
    playMenuSound () {
      this.menuAudio.play()
    },
    toggleVolumeModal () {
      this.showVolumeModal = !this.showVolumeModal
    }
  },
  beforeRouteLeave (to, from , next) {
    if (to.name === 'Game') {
      if (this.canStart) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>
