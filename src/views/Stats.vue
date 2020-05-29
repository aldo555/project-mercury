<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4">
    <router-link @click.native="playMenuSound" :to="{ name: 'Menu' }" class="absolute top-0 left-0 p-8 max-w-xl w-full transition ease-in-out duration-150 text-blue-700 hover:text-blue-600 text-2xl capitalize text-left">&lsaquo; Back</router-link>
    <div v-if="results.length" class="flex flex-col max-w-2xl w-full mb-8 justify-center items-center">
      <h1 class="text-center mb-4 text-blue-500 text-4xl capitalize">Stats across all games played</h1>
      <div class="flex flex-row text-2xl px-4 text-blue-200 text-left justify-center">
        <div class="flex flex-col text-blue-500 mr-4">
          <span>Skill Level</span>
          <span>WPM</span>
          <span>Accuracy</span>
          <span>Longest Game</span>
        </div>
        <div class="flex flex-col text-blue-200">
          <span>{{ computeSkillLevel() }}</span>
          <span>{{ averageWpm }}</span>
          <span>{{ averageAccuracy }}%</span>
          <span>{{ longestGameMinutes() }}:{{ longestGameSeconds() }}</span>
        </div>
      </div>
      <button @click="resetStats(); playMenuSound()" class="mt-12 bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500 px-5 py-2 text-2xl uppercase rounded text-white max-w-xl w-full">Reset Stats</button>
    </div>
    <div v-else class="flex flex-col max-w-lg w-full mb-8">
      <h1 class="text-center mb-4 text-blue-200 text-4xl"><span class="text-blue-500">No stats to display.</span> <br /> Go play already.</h1>
      <router-link @click.native="playMenuSound()" :to="{ name: 'Menu'}" class="mt-4 text-center bg-gradient-r-blue-800 bg-blue-900 hover:bg-blue-800 px-5 py-2 text-2xl uppercase rounded text-white max-w-xl w-full">Back To Main Menu</router-link>
    </div>

    <volume></volume>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Volume from '@/components/Volume'

export default {
  name: 'Stats',
  components: {
    Volume
  },
  computed: {
    ...mapGetters({
      results: 'Stats/getResults',
      longestGame: 'Stats/getLongestGame',
      averageWpm: 'Stats/getAverageWpm',
      averageAccuracy: 'Stats/getAverageAccuracy',
      menuAudio: 'Music/getMenuAudio'
    })
  },
  methods: {
    ...mapActions({
      reset: 'Stats/reset',
    }),
    longestGameMinutes () {
      return Math.floor(this.longestGame / 60)
    },
    longestGameSeconds () {
      const seconds = this.longestGame - (this.longestGameMinutes() * 60)

      if (seconds < 10) {
        return `0${seconds}`
      }

      return seconds
    },
    computeSkillLevel () {
      if (this.averageWpm <= 4) {
        return 'Shameful'
      } else if (this.averageWpm <= 9) {
        return 'Pathetic'
      } else if (this.averageWpm <= 19) {
        return 'Barely Trying'
      } else if (this.averageWpm <= 29) {
        return 'Junior Receptionist'
      } else if (this.averageWpm <= 39) {
        return 'Keyboard Warrior'
      }

      return 'Hacker'
    },
    playMenuSound () {
      this.menuAudio.play()
    },
    resetStats () {
      this.reset()
    }
  }
}
</script>
