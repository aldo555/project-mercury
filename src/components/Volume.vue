<template>
  <div>
    <div v-if="isVolumeOn" @click="toggleVolumeModal" class="absolute bottom-0 right-0 p-8 text-blue-400 hover:text-blue-200 cursor-pointer">
      <svg class="w-8 h-8 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"></path></svg>
    </div>

    <div v-else @click="toggleVolumeModal" class="absolute bottom-0 right-0 p-8 text-blue-400 hover:text-blue-200 cursor-pointer">
    <svg class="w-8 h-8 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </div>

    <div v-if="showVolumeModal" class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
      <div class="fixed inset-0 transition-opacity" @click="toggleVolumeModal">
        <div class="absolute inset-0 bg-blue-900 opacity-75"></div>
      </div>
      <div class="card-notched bg-white rounded p-8 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div>
          <div class="text-center">
            <div class="flex flex-col text-left text-blue-900">
              <span class="mb-1">SFX</span>
              <input v-model="menuVolume" class="rounded-lg overflow-hidden appearance-none bg-blue-500 h-3 w-128" type="range" min="0" max="1" step="0.01" />
              <span class="mt-4 mb-1">Background</span>
              <input v-model="backgroundVolume" class="rounded-lg overflow-hidden appearance-none bg-blue-500 h-3 w-128" type="range" min="0" max="1" step="0.01" />
              <span class="mt-4 mb-1">In Game</span>
              <input v-model="playVolume" class="rounded-lg overflow-hidden appearance-none bg-blue-500 h-3 w-128" type="range" min="0" max="1" step="0.01" />
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-10">
          <button @click="resetVolume(); playMenuSound()" class="mb-2 transition ease-in-out duration-150 bg-gradient-r-red-700 bg-red-800 hover:bg-red-700 px-2 py-1 text-xl uppercase rounded text-white max-w-xl w-full">Reset</button>
          <button @click="toggleVolumeModal(); playMenuSound()" class="transition ease-in-out duration-150 bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500 px-2 py-1 text-xl uppercase rounded text-white max-w-xl w-full">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Volume',
  data () {
    return {
      showVolumeModal: false,
    }
  },
  computed: {
    ...mapGetters({
      menuAudio: 'Music/getMenuAudio',
    }),
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

    isVolumeOn () {
      return parseFloat(this.menuVolume) + parseFloat(this.backgroundVolume) + parseFloat(this.playVolume)
    }
  },
  methods: {
    ...mapActions({
      resetVolume: 'Music/resetVolume'
    }),
    playMenuSound () {
      this.menuAudio.play()
    },
    toggleVolumeModal () {
      this.showVolumeModal = !this.showVolumeModal
    }
  },
}
</script>
