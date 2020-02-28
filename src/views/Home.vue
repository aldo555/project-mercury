<template>
  <div class="min-h-screen relative">
    <h1 v-if="loading" class="text-6xl text-indigo-600 text-center">Loading</h1>
    <form @submit.prevent="scoreWord">
      <input v-model="userInput" type="text" class="text-indigo-900 w-full text-center text-6xl shadow-xl border-b border-gray-200" placeholder="type it up" />
    </form>
    <canvas v-show="!loading" ref="game-canvas"></canvas>
    <div class="absolute top-0 left-0 text-xl py-1 px-4 text-indigo-700">
      Scored: {{ score.success }} <br />
      Missed: {{ score.missed }} <br />
      <span class="text-indigo-500">WPM: {{ Math.floor(score.wpm) }}</span>
    </div>
  </div>
</template>

<script>
import * as words from '@/dict/english.json'

export default {
  name: 'Home',
  data () {
    return {
      loading: true,
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
        success: 0,
        missed: 0,
        wpm: 0
      },
      gameOptions: {
        wordsToAdd: 1,
        intensity: 1,
        intensityIncreaseRate: 0.5
      },
      timestep: {
        now: null,
        dt: 0,
        last: null,
        step: 1 // represents fps so 1/60 for 60fps
      },
      userInput: ''
    }
  },
  mounted () {
    this.initCanvas()
    this.prepWords()
    this.loading = false
    this.timestep.last = this.timestamp()
    this.startGame()
  },
  methods: {
    initCanvas () {
      this.canvas = this.$refs['game-canvas']
      this.context = this.canvas.getContext('2d')
      this.canvas.width = this.canvas.parentElement.clientWidth
      this.canvas.height = this.canvas.parentElement.clientHeight - 96 // the 96 is here for test purposes, accounts for the input at the top
      this.context.font = `bold ${this.canvasOptions.textSize}px Helvetica`
      window.addEventListener('resize', this.resizeCanvas)
    },
    clearCanvas () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    resizeCanvas () {
      this.canvas.width = this.$refs['game-canvas'].parentElement.clientWidth
      this.canvas.height = this.$refs['game-canvas'].parentElement.clientHeight - 96
      this.context.font = `bold ${this.canvasOptions.textSize}px Helvetica`
    },
    randomColor () {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
    timestamp () {
      return window.performance && window.performance.now ? window.performance.now() : new Date().getTime()
    },
    prepWords () {
      Object.values(words.default).forEach(word => {
        this.words.all.push({
          word: word,
          x: 0,
          y: Math.floor(Math.random() * this.canvas.height),
          width: this.context.measureText(word).width,
          color: this.randomColor()
        })
      })
    },
    displayWords (numberOfWords) {
      const shuffled = [...this.words.all].sort(() => 0.5 - Math.random())
      // this.words.displayed = shuffled.slice(0, numberOfWords)
      this.words.displayed = [...this.words.displayed, ...shuffled.slice(0, numberOfWords)]
    },
    removeWord (word) {
      this.words.displayed.splice(this.words.displayed.indexOf(word), 1)
    },
    startGame () {
      this.displayWords(this.gameOptions.wordsToAdd)
      requestAnimationFrame(this.drawWords)
    },
    drawWords () {
      this.clearCanvas()

      this.words.displayed.forEach(word => {
        if (word.x > this.canvas.width) {
          this.removeWord(word)
          this.score.missed += 1
          return
        }

        if (word.y < this.canvasOptions.textSize) {
          word.y += 5
        }

        if (word.y > this.canvas.height - this.canvasOptions.textSize) {
          word.y -= 20
        }

        word.x += Math.cbrt(this.gameOptions.intensity) // Math.floor(Math.random() * this.gameOptions.intensity)
        word.y += Math.random() < 0.5 ? -1 : 1

        this.drawSingleWord(word)
      })

      this.timestep.now = this.timestamp()
      this.timestep.dt = this.timestep.dt + Math.min(1, (this.timestep.now - this.timestep.last) / 1000)

      while (this.timestep.dt > this.timestep.step) {
        this.timestep.dt = this.timestep.dt - this.timestep.step
        this.score.timeElapsed += 1
        this.score.wpm = this.score.success / (this.score.timeElapsed / 60)
        if (this.score.timeElapsed % 60 === 0) {
          this.gameOptions.wordsToAdd += 1
        }
        this.displayWords(this.gameOptions.wordsToAdd)
        this.gameOptions.intensity += this.gameOptions.intensityIncreaseRate
      }

      this.timestep.last = this.timestep.now

      requestAnimationFrame(this.drawWords)
    },
    drawSingleWord (word) {
      this.context.fillStyle = word.color
      this.context.fillText(word.word, word.x, word.y)
    },
    scoreWord () {
      const wordToDelete = this.words.displayed.find(word => {
        return word.word === this.userInput
      })

      if (wordToDelete) {
        this.score.success += 1
        this.removeWord(wordToDelete)
      }

      // keep track of the score you little bitch

      this.userInput = ''
    }
  }
}
</script>
