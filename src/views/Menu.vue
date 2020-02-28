<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4">
    <button @click="togglePlayMenu" class="bg-indigo-500 px-10 py-4 mb-8 text-4xl uppercase rounded-lg text-white max-w-xl w-full">Play</button>
    <div v-if="isPlayMenuDisplayed" class="flex flex-col max-w-lg w-full mb-8">
      <h2 class="text-center mb-4 text-indigo-900 text-2xl font-bold capitalize">Language - {{ options.language }}</h2>
      <button @click="selectLanguage('english')" class="bg-indigo-700 px-5 py-2 mb-2 text-2xl uppercase rounded-lg text-white w-full">English</button>
      <button @click="selectLanguage('romanian')" class="bg-indigo-700 px-5 py-2 mb-2 text-2xl uppercase rounded-lg text-white w-full">Romanian</button>
      <button @click="selectLanguage('swedish')" class="bg-indigo-700 px-5 py-2 mb-8 text-2xl uppercase rounded-lg text-white w-full">Swedish</button>
      <h2 class="text-center mb-1 text-indigo-900 text-2xl font-bold capitalize">Type with accents - {{ options.accents ? 'True' : 'False' }}</h2>
      <small class="text-base text-indigo-800 text-center mb-4">Not applicable for English</small>
      <button @click="toggleAccents()" class="bg-indigo-700 px-5 py-2 mb-8 text-2xl uppercase rounded-lg text-white w-full">Toggle Accents</button>
      <h2 class="text-center mb-4 text-indigo-900 text-2xl font-bold">Difficulty</h2>
      <button disabled class="bg-indigo-300 px-5 py-2 mb-2 text-2xl uppercase rounded-lg text-white w-full">Easy</button>
      <button disabled class="bg-indigo-300 px-5 py-2 mb-2 text-2xl uppercase rounded-lg text-white w-full">Medium</button>
      <button disabled class="bg-indigo-300 px-5 py-2 mb-8 text-2xl uppercase rounded-lg text-white w-full">Hard</button>
      <button :disabled="!readyToStart" @click="startGame" class="bg-indigo-700 px-5 py-2 mb-8 text-2xl uppercase rounded-lg text-white w-full">Start</button>
    </div>
    <button disabled class="bg-indigo-300 px-10 py-4 text-4xl uppercase rounded-lg text-indigo-100 max-w-xl w-full">Stats</button>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      dictionary: '',
      isPlayMenuDisplayed: false,
      options: {
        language: 'english',
        accents: true
      }
    }
  },
  methods: {
    togglePlayMenu () {
      this.isPlayMenuDisplayed = !this.isPlayMenuDisplayed
    },
    selectLanguage (language) {
      this.options.language = language
    },
    toggleAccents () {
      this.options.accents = !this.options.accents
    },
    isLanguageSelected () {
      if (!this.options.language) {
        return false
      }

      return true
    },
    readyToStart () {
      if (!this.isLanguageSelected()) {
        return false
      }

      return true
    },
    startGame () {
      this.$router.push({ name: 'Game', params: { menuOptions: this.options } })
    }
  }
}
</script>

<style>

</style>
