<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4">
    <div v-if="results" class="flex flex-col max-w-lg w-full mb-8">
      <router-link :to="{ name: 'Menu' }" class="text-indigo-700 mb-6 text-2xl capitalize max-w-xl w-full text-left">&lsaquo; Back</router-link>
      <h1 class="text-center mb-4 text-indigo-900 text-4xl capitalize">Stats across all games played</h1>
      <h2 class="text-center mb-4 text-indigo-800 text-2xl capitalize">Overall skill level - <strong class="text-indigo-500">{{ computeSkillLevel() }}</strong></h2>
      <h2 class="text-center mb-4 text-indigo-800 text-2xl capitalize">Average WPM - <strong class="text-indigo-500">{{ averageWpm }}</strong></h2>
      <h2 class="text-center mb-4 text-indigo-800 text-2xl capitalize">Average Accuracy - <strong class="text-indigo-500">{{ averageAccuracy }}</strong></h2>
      <h2 class="text-center mb-4 text-indigo-800 text-2xl capitalize">Longest game - <strong class="text-indigo-500">{{ longestGameMinutes() }}:{{ longestGameSeconds() }}</strong></h2>
    </div>
    <div v-else class="flex flex-col max-w-lg w-full mb-8">
      <router-link :to="{ name: 'Menu' }" class="text-indigo-700 mb-6 text-2xl capitalize max-w-xl w-full text-left">&lsaquo; Back</router-link>
      <h1 class="text-center mb-4 text-indigo-900 text-4xl capitalize">No stats to display. <br /> Go play.</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Stats',
  computed: {
    ...mapGetters({
      results: 'Stats/getResults',
      longestGame: 'Stats/getLongestGame',
      averageWpm: 'Stats/getAverageWpm',
      averageAccuracy: 'Stats/getAverageAccuracy'
    })
  },
  methods: {
    longestGameMinutes () {
      return Math.floor(this.longestGame / 60)
    },
    longestGameSeconds () {
      return this.longestGame - (this.longestGameMinutes() * 60)
    },
    computeSkillLevel () {
      if (this.averageWpm <= 4) {
        return 'Shameful'
      } else if (this.averageWpm <= 9) {
        return 'Pathetic'
      } else if (this.averageWpm <= 19) {
        return 'Barely trying'
      } else if (this.averageWpm <= 29) {
        return 'Junior Receptionist'
      } else if (this.averageWpm <= 39) {
        return 'Keyboard Warrior'
      }

      return 'Hacker'
    },
  }
}
</script>
