<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4 text-center">
    <h2 class="text-center mb-2 text-indigo-900 text-4xl capitalize">Your skill level is <strong class="text-indigo-500">{{ score.skillLevel }}</strong></h2>
    <h2 class="text-center mb-2 text-indigo-900 text-2xl font-bold capitalize">Accuracy - {{ score.accuracy }}%</h2>
    <h2 class="text-center mb-2 text-indigo-900 text-2xl font-bold capitalize">Word Per Minute - {{ score.wpm }}</h2>
    <h2 class="text-center mb-8 text-indigo-900 text-2xl font-bold capitalize">Time Elapsed - {{ getElapsedMinutes() }}:{{ getElapsedSeconds() }}</h2>
    <router-link :to="{ name: 'Menu'}" class="bg-indigo-700 px-5 py-2 text-2xl uppercase rounded-lg text-white max-w-xl w-full">Back To Main Menu</router-link>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: {
    score: Object,
  },
  methods: {
    getElapsedMinutes () {
      return Math.floor(this.score.timeElapsed / 60)
    },
    getElapsedSeconds () {
      const seconds =  this.score.timeElapsed - (this.getElapsedMinutes() * 60)

      if (seconds < 10) {
        return `0${seconds}`
      }

      return seconds
    }
  }
}
</script>
