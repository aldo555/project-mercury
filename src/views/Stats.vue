<template>
  <div class="flex flex-col w-full mb-8 p-8">
    <router-link @click.native="playMenuSound" :to="{ name: 'Menu' }" class="max-w-xl w-full transition ease-in-out duration-150 text-blue-700 hover:text-blue-600 mb-16 text-2xl capitalize text-left">&lsaquo; Back</router-link>

    <h1 class="mb-8 text-blue-500 text-4xl capitalize">Stats across all games played</h1>

    <div v-if="results.length">
      <div v-for="(difficulty, index) in difficulties" :key="index" >
        <div v-if="longestGame(difficulty.name)" class="mb-12">
          <h2 class="text-left text-blue-200 text-2xl font-bold capitalize mb-4">{{ difficulty.name }}</h2>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-5">
            <div class="bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500 transition ease-in-out duration-150 overflow-hidden shadow rounded card-notched relative overflow-hidden">
              <div class="px-4 py-8 sm:p-10">
                <div>
                  <div class="leading-5 mt-1 text-blue-100">
                    Games Played
                  </div>
                  <div class="text-3xl leading-9 text-white uppercase">
                    {{ gamesPlayed(difficulty.name) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500 transition ease-in-out duration-150 overflow-hidden shadow rounded card-notched relative overflow-hidden">
              <div class="px-4 py-8 sm:p-10">
                <div>
                  <div class="leading-5 mt-1 text-blue-100">
                    Longest Game
                  </div>
                  <div class="text-3xl leading-9 text-white uppercase">
                    {{ longestGameMinutes(difficulty.name) }}:{{ longestGameSeconds(difficulty.name) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gradient-r-orange-300 hover:bg-orange-300 bg-orange-500 transition ease-in-out duration-150 overflow-hidden shadow rounded card-notched relative overflow-hidden">
              <div class="px-4 py-8 sm:p-10">
                <div>
                  <div class="leading-5 mt-1 text-blue-100">
                    Skill Level
                  </div>
                  <div class="text-3xl leading-9 text-white uppercase">
                    {{ skillLevel(difficulty.name) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500 transition ease-in-out duration-150 overflow-hidden shadow rounded card-notched relative overflow-hidden">
              <div class="px-4 py-8 sm:p-10">
                <div>
                  <div class="leading-5 mt-1 text-blue-100">
                    WPM
                  </div>
                  <div class="text-3xl leading-9 text-white uppercase">
                    {{ averageWpm(difficulty.name) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500 transition ease-in-out duration-150 overflow-hidden shadow rounded card-notched relative overflow-hidden">
              <div class="px-4 py-8 sm:p-10">
                <div>
                  <div class="leading-5 mt-1 text-blue-100">
                    Accuracy
                  </div>
                  <div class="text-3xl leading-9 text-white uppercase">
                    {{ averageAccuracy(difficulty.name) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button @click="resetStats(); playMenuSound()" class="mt-12 bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500 px-5 py-2 text-2xl uppercase rounded text-white max-w-md w-full">Reset Stats</button>
    </div>
    
    <div v-else class="flex w-full mb-8">
      <h2 class="text-center mb-4 text-blue-200 text-2xl"><span class="text-blue-500">No stats to display.</span> Go play already.</h2>
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
      difficulties: 'Settings/getDifficulties',
      menuAudio: 'Music/getMenuAudio'
    })
  },
  methods: {
    ...mapActions({
      reset: 'Stats/reset',
    }),
    gamesPlayed(difficulty) {
       if (!this.results.length) {
        return null
      }

      const filteredResults = this.results.filter( result => {
        return result.difficulty === difficulty
      })
      
      if (!filteredResults.length) {
        return null
      }

      return filteredResults.length
    },
    longestGame(difficulty) {
      if (!this.results.length) {
        return null
      }

      const filteredResults = this.results.filter( result => {
        return result.difficulty === difficulty
      })
      
      if (!filteredResults.length) {
        return null
      }

      return filteredResults.reduce((prev, current) => (prev.timeElapsed > current.timeElapsed) ? prev : current).timeElapsed
    },
    longestGameMinutes (difficulty) {
      return Math.floor(this.longestGame(difficulty) / 60)
    },
    longestGameSeconds (difficulty) {
      const seconds = this.longestGame(difficulty) - (this.longestGameMinutes(difficulty) * 60)

      if (seconds < 10) {
        return `0${seconds}`
      }

      return seconds
    },
    averageWpm (difficulty) {
      if (!this.results.length) {
        return null
      }

      const filteredResults = this.results.filter( result => {
        return result.difficulty === difficulty
      })

      if (!filteredResults.length) {
        return null
      }

      return Math.floor(filteredResults.reduce((total, next) => total + next.wpm, 0) / filteredResults.length)
    },
    averageAccuracy (difficulty) {
      if (!this.results.length) {
        return null
      }

      const filteredResults = this.results.filter( result => {
        return result.difficulty === difficulty
      })

      if (!filteredResults.length) {
        return null
      }
      
      return Math.floor(filteredResults.reduce((total, next) => total + next.accuracy, 0) / filteredResults.length)
    },
    skillLevel (difficulty) {
      const averageWpm = this.averageWpm(difficulty)

      if (averageWpm <= 4) {
        return 'Shameful'
      } else if (averageWpm <= 9) {
        return 'Pathetic'
      } else if (averageWpm <= 19) {
        return 'Barely Trying'
      } else if (averageWpm <= 29) {
        return 'Junior Receptionist'
      } else if (averageWpm <= 39) {
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
