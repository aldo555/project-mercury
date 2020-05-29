<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4 text-center text-blue-200">
    <h2 class="text-center mb-2 text-4xl text-blue-500">Your Skill Level is <strong class="text-blue-200">{{ score.skillLevel }}</strong></h2>
    <div class="flex flex-row text-2xl px-4 text-blue-200 text-left">
      <div class="flex flex-col text-blue-500 mr-4">
        <span>Accuracy</span>
        <span>WPM</span>
      </div>
      <div class="flex flex-col text-blue-200">
        <span>{{ score.accuracy }}%</span>
        <span>{{ score.wpm }}</span>
      </div>
    </div>

    <button @click="playAgain(); playMenuSound()" class="mt-12 bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500 px-5 py-2 text-2xl uppercase rounded text-white max-w-xl w-full">Play Again</button>
    <router-link @click.native="playMenuSound()" :to="{ name: 'Menu'}" class="mt-4 bg-gradient-r-blue-800 bg-blue-900 hover:bg-blue-800 px-5 py-2 text-2xl uppercase rounded text-white max-w-xl w-full">Back To Main Menu</router-link>
 
    <volume></volume>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Volume from '@/components/Volume'

export default {
  name: 'Results',
  components: {
    Volume
  },
  props: {
    score: Object,
  },
  data () {
    return {
      canStart: false,
    }
  },
  computed: {
    ...mapGetters({
      menuAudio: 'Music/getMenuAudio',
      playMusic: 'Music/getPlayMusic',
      backgroundMusic: 'Music/getBackgroundMusic',
    }),
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
    },
    playAgain () {
      this.canStart = true
      this.$router.push({ name: 'Game' })
      this.backgroundMusic.pause()
      this.playMusic.play()
    },
    playMenuSound () {
      this.menuAudio.play()
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
