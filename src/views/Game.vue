<template>
  <div class="min-h-screen relative" @keydown.esc="pauseGame">
    <form @submit.prevent="scoreWord">
      <input ref="user-input" v-model="userInput" type="text" class="text-white w-full text-center text-6xl bg-transparent outline-none py-3" placeholder="type it up">
    </form>
    <canvas ref="game-canvas"></canvas>
    <div class="absolute flex flex-row top-0 left-0 text-xl py-3 px-4 text-blue-200">
      <div class="flex flex-col text-blue-500 mr-4">
        <span>Accuracy</span>
        <span>WPM</span>
        <span>Skill Level</span>
      </div>
      <div class="flex flex-col text-blue-200">
        <span>{{ score.accuracy }}%</span>
        <span>{{ score.wpm }}</span>
        <span>{{ score.skillLevel }}</span>
      </div>
    </div>
    <div class="absolute top-0 right-0 text-xl py-3 px-4 mt-6 text-blue-200 flex flex-row">
      <div v-for="heart in (missesToLose - score.missed)" :key="heart" class="mr-1">
        <svg :class="[ missesToLose - score.missed <= 3 ? 'text-red-500' : 'text-blue-200' ]" class="w-4 h-12 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 100"><rect width="256" height="256" /></svg>
      </div>
    </div>

    <div v-if="showLeaveModal" class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-blue-900 opacity-75"></div>
      </div>
      <div class="card-notched bg-white rounded p-8 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div>
          <div class="text-center">
            <h3 class="text-2xl leading-6 font-medium text-blue-900" id="modal-headline">
              Game is Paused
            </h3>
          </div>
        </div>
        <div class="flex flex-col mt-5 sm:mt-6">
          <button @click="continueGame()" class="transition ease-in-out duration-150 bg-gradient-r-blue-500 bg-blue-700 hover:bg-blue-500 px-2 py-1 text-xl uppercase rounded text-white max-w-xl w-full">Continue</button>
          <button @click="exitGame()" class="mt-2 transition ease-in-out duration-150 bg-gradient-r-red-700 bg-red-800 hover:bg-red-700 px-2 py-1 text-xl uppercase rounded text-white max-w-xl w-full">Exit</button>
        </div>
      </div>
    </div>

    <volume v-if="gameIsPaused"></volume>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Word from '@/common/Word'
import Volume from '@/components/Volume'

export default {
  name: 'Game',
  components: {
    Volume
  },
  data () {
    return {
      canvas: null,
      context: null,
      canvasOptions: {
        textSize: 32 // px
      },
      words: {
        all: [],
        displayed: []
      },
      score: {
        timeElapsed: 0,
        typedEntries: 0,
        success: 0,
        errors: 0,
        missed: 0,
        wpm: 0,
        accuracy: 0,
        skillLevel: ''
      },
      scoreSound: null,
      errorSound: null,
      gameOptions: {
        wordsToAdd: 0,
        intensity: 0
      },
      timestep: {
        now: null,
        dt: 0,
        last: null,
        step: 1 // represents fps so 1/60 for 60fps
      },
      userInput: '',
      showLeaveModal: false,
      gameIsPaused: false
    }
  },
  computed: {
    ...mapGetters({
      language: 'Settings/getLanguage',
      useAccents: 'Settings/getUseAccents',
      wordsToAddStartingPoint: 'Settings/getWordsToAddStartingPoint',
      wordsToAddInterval: 'Settings/getWordsToAddInterval',
      addWordInterval: 'Settings/getAddWordInterval',
      intensityStartingPoint: 'Settings/getIntensityStartingPoint',
      intensityIncreaseRate: 'Settings/getIntensityIncreaseRate',
      missesToLose: 'Settings/getMissesToLose',
      playMusic: 'Music/getPlayMusic',
      backgroundMusic: 'Music/getBackgroundMusic',
      menuVolume: 'Music/getMenuVolume'
    })
  },
  mounted () {
    this.initGame()
    this.startGame()
  },
  methods: {
    ...mapActions({
      addNewResult: 'Stats/addNewResult'
    }),
    initGame () {
      this.canvas = this.$refs['game-canvas']
      this.context = this.canvas.getContext('2d')
      this.canvas.width = this.canvas.parentElement.clientWidth
      this.canvas.height = this.canvas.parentElement.clientHeight - 120 // accounts for the input at the top
      this.context.font = `bold ${this.canvasOptions.textSize}px eurostile`
      window.addEventListener('resize', this.resizeCanvas)

      this.gameOptions.wordsToAdd = this.wordsToAddStartingPoint
      this.gameOptions.intensity = this.intensityStartingPoint

      this.prepWords()

      this.$refs['user-input'].focus()

      this.scoreSound = new Audio(require('@/assets/score.wav'))
      this.errorSound = new Audio(require('@/assets/error.wav'))
      this.scoreSound.volume = this.menuVolume
      this.errorSound.volume = this.menuVolume
    },
    clearCanvas () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    resizeCanvas () {
      this.canvas.width = this.$refs['game-canvas'].parentElement.clientWidth
      this.canvas.height = this.$refs['game-canvas'].parentElement.clientHeight - 120
      this.context.font = `bold ${this.canvasOptions.textSize}px eurostile`
    },
    timestamp () {
      return window.performance && window.performance.now ? window.performance.now() : new Date().getTime()
    },
    prepWords () {
      const words = require(`@/dict/${this.language}.json`)

      Object.values(words).forEach(word => {
        this.words.all.push(new Word({
          word: word.toLowerCase(),
          x: 0 - (this.context.measureText(word).width + Math.floor(Math.random() * this.context.measureText(word).width)),
          y: Math.floor(Math.random() * this.canvas.height),
          width: this.context.measureText(word).width
        }))
      })
    },
    displayWords (numberOfWords) {
      const shuffled = [...this.words.all].sort(() => 0.5 - Math.random())

      const wordsToAdd = shuffled.slice(0, numberOfWords)

      // divide into rows depending on number of words and place each word at a
      // random spot in that row with padding that's depending on the text size
      wordsToAdd.forEach((word, index) => {
        const row = this.canvas.height / wordsToAdd.length

        word.y = (row * index) + this.canvasOptions.textSize + Math.floor(Math.random() * (row - this.canvasOptions.textSize))
      })

      this.words.displayed = [...this.words.displayed, ...shuffled.slice(0, numberOfWords)]
    },
    removeWord (word) {
      this.words.displayed.splice(this.words.displayed.indexOf(word), 1)
    },
    computeWpm () {
      return Math.floor((this.score.typedEntries / 5) / (this.score.timeElapsed / 60))
    },
    computeAccuracy () {
      if (!this.score.success && !this.score.errors) {
        return 100
      }

      return Math.floor((this.score.success / (this.score.success + this.score.errors)) * 100)
    },
    computeSkillLevel () {
      if (this.score.wpm <= 4) {
        return 'Shameful'
      } else if (this.score.wpm <= 9) {
        return 'Pathetic'
      } else if (this.score.wpm <= 19) {
        return 'Barely Trying'
      } else if (this.score.wpm <= 29) {
        return 'Junior Receptionist'
      } else if (this.score.wpm <= 39) {
        return 'Keyboard Warrior'
      }

      return 'Hacker'
    },
    startGame () {
      this.displayWords(this.gameOptions.wordsToAdd)
      requestAnimationFrame(this.drawWords)
    },
    drawWords () {
      if (this.gameIsPaused) {
        return
      }

      this.clearCanvas()

      if (!this.timestep.last) {
        this.timestep.last = this.timestamp()
      }

      for (let i = 0; i < this.words.displayed.length; i++) {
        const word = this.words.displayed[i]

        if (word.x > this.canvas.width) {
          this.removeWord(word)
          this.score.missed += 1
          this.errorSound.play()

          if (this.score.missed >= this.missesToLose) {
            break
          }

          continue
        }

        word.x += Math.cbrt(this.gameOptions.intensity) // Math.cbrt(this.gameOptions.intensity * this.timestep.dt)

        word.draw(this.canvas)
      }

      if (this.score.missed >= this.missesToLose) {
        window.removeEventListener('resize', this.resizeCanvas)
        this.addNewResult(this.score)
        this.playMusic.pause()
        this.backgroundMusic.play()
        this.$router.push({ name: 'Results', params: { score: this.score } })
        return
      }

      this.timestep.now = this.timestamp()
      this.timestep.dt = this.timestep.dt + Math.min(1, (this.timestep.now - this.timestep.last) / 1000)

      while (this.timestep.dt > this.timestep.step) {
        this.timestep.dt = this.timestep.dt - this.timestep.step
        this.score.timeElapsed += 1
        this.score.wpm = this.computeWpm()
        this.score.accuracy = this.computeAccuracy()
        this.score.skillLevel = this.computeSkillLevel()
        if (this.score.timeElapsed % this.addWordInterval === 0) {
          this.gameOptions.wordsToAdd += 1
        }
        if (this.score.timeElapsed % this.wordsToAddInterval === 0) {
          this.displayWords(this.gameOptions.wordsToAdd)
        }
        this.gameOptions.intensity += this.intensityIncreaseRate
      }

      this.timestep.last = this.timestep.now

      requestAnimationFrame(this.drawWords)
    },
    playScoreSound () {
      this.scoreSound.play()
    },
    playErrorSound () {
      this.errorSound.play()
    },
    scoreWord () {
      const wordToDelete = this.words.displayed.find(word => {
        if (!this.useAccents) {
          return word.noAccents() === this.userInput.toLowerCase()
        }

        return word.word === this.userInput.toLowerCase()
      })

      if (wordToDelete) {
        this.score.success += 1
        this.score.typedEntries += wordToDelete.word.length
        this.removeWord(wordToDelete)
        this.playScoreSound()
      } else {
        this.score.errors += 1
        this.playErrorSound()
      }

      this.userInput = ''
    },
    pauseGame() {
      this.showLeaveModal = true
      this.gameIsPaused = true
      this.playMusic.pause()
      this.backgroundMusic.play()
    },
    continueGame() {
      this.$refs['user-input'].focus()
      this.showLeaveModal = false
      this.gameIsPaused = false
      this.backgroundMusic.pause()
      this.playMusic.play()
      requestAnimationFrame(this.drawWords)
    },
    exitGame() {
      this.$router.go()
    }
  },
  beforeRouteLeave (to, from , next) {
    if (this.score.missed >= this.missesToLose) {
      next()
    }
    else {
      this.pauseGame()
      next(false)
    }
  }
}
</script>
