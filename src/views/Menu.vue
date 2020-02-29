<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4">
    <button v-if="!isPlayMenuDisplayed" @click="togglePlayMenu" class="bg-indigo-500 px-10 py-4 mb-8 text-4xl uppercase rounded-lg text-white max-w-xl w-full">Play</button>
    <div v-if="isPlayMenuDisplayed" class="flex flex-col max-w-lg w-full mb-8">
      <button @click="togglePlayMenu" class="text-indigo-700 mb-6 text-2xl capitalize max-w-xl w-full text-left">&lsaquo; Back</button>
      <h2 class="text-center mb-4 text-indigo-900 text-2xl font-bold capitalize">Language - {{ language }}</h2>
      <button @click="selectLanguage('english')" class="bg-indigo-700 px-5 py-2 mb-2 text-2xl uppercase rounded-lg text-white w-full">English</button>
      <button @click="selectLanguage('romanian')" class="bg-indigo-700 px-5 py-2 mb-2 text-2xl uppercase rounded-lg text-white w-full">Romanian</button>
      <button @click="selectLanguage('swedish')" class="bg-indigo-700 px-5 py-2 mb-8 text-2xl uppercase rounded-lg text-white w-full">Swedish</button>
      <h2 class="text-center mb-1 text-indigo-900 text-2xl font-bold capitalize">Type with accents - {{ useAccents ? 'True' : 'False' }}</h2>
      <small class="text-base text-indigo-800 text-center mb-4">Not applicable for English</small>
      <button @click="toggleAccents(!useAccents)" class="bg-indigo-700 px-5 py-2 mb-8 text-2xl uppercase rounded-lg text-white w-full">Toggle Accents</button>
      <h2 class="text-center mb-4 text-indigo-900 text-2xl font-bold">Difficulty</h2>
      <button disabled class="bg-indigo-300 px-5 py-2 mb-2 text-2xl uppercase rounded-lg text-white w-full">Easy</button>
      <button disabled class="bg-indigo-300 px-5 py-2 mb-2 text-2xl uppercase rounded-lg text-white w-full">Medium</button>
      <button disabled class="bg-indigo-300 px-5 py-2 mb-12 text-2xl uppercase rounded-lg text-white w-full">Hard</button>
      <button @click="startGame" class="bg-indigo-500 px-10 py-4 mb-8 text-4xl uppercase rounded-lg text-white w-full">Start</button>
    </div>
    <button v-if="!isPlayMenuDisplayed" disabled class="bg-indigo-300 px-10 py-4 text-4xl uppercase rounded-lg text-indigo-100 max-w-xl w-full">Stats</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Menu',
  data () {
    return {
      isPlayMenuDisplayed: false
    }
  },
  computed: {
    ...mapGetters({
      language: 'Settings/getLanguage',
      useAccents: 'Settings/getUseAccents'
    })
  },
  methods: {
    ...mapActions({
      selectLanguage: 'Settings/setLanguage',
      toggleAccents: 'Settings/setUseAccents'
    }),
    togglePlayMenu () {
      this.isPlayMenuDisplayed = !this.isPlayMenuDisplayed
    },
    startGame () {
      this.$router.push({ name: 'Game' })
    }
  }
}
</script>
