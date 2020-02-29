<template>
  <div class="min-h-screen relative">
    <h1 v-if="loading" class="text-6xl text-indigo-600 text-center">Loading</h1>
    <form @submit.prevent="scoreWord">
      <input ref="user-input" v-model="userInput" type="text" class="text-indigo-900 w-full text-center text-6xl shadow-xl border-b border-gray-200" placeholder="type it up" />
    </form>
    <canvas v-show="!loading" ref="game-canvas"></canvas>
    <div class="absolute top-0 left-0 text-xl py-1 px-4 text-indigo-700">
      Accuracy: {{ score.accuracy || '-' }} <br />
      <span class="text-indigo-500">WPM: {{ score.wpm }}</span> <br />
      Skill level: {{ score.skillLevel }}
    </div>
    <div class="absolute top-0 right-0 text-xl py-1 px-4 text-indigo-700 mt-3 flex flex-row">
      <div v-for="heart in (gameOptions.missesToLose - score.missed)" :key="heart" class="mr-2">
        <svg class="w-16 h-16 fill-current text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"></path></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
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
        errors: 0,
        missed: 0,
        wpm: 0,
        accuracy: 0,
        skillLevel: ''
      },
      gameOptions: {
        wordsToAdd: 2,
        intensity: 1,
        intensityIncreaseRate: 0.1,
        missesToLose: 5
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
  props: {
    menuOptions: Object
  },
  mounted () {
    this.initCanvas()
    this.prepWords()
    this.loading = false
    this.$refs['user-input'].focus()
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
    noAccents (word) {
      return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    },
    checkWordCollision (word1, word2) {
      // returns true if two words are colliding
      return !(word1.x > word2.x + word2.width ||
        word1.x + word1.width < word2.x ||
        word1.y > word2.y + this.canvasOptions.textSize ||
        word1.y + this.canvasOptions.textSize < word2.y)
    },
    prepWords () {
      const words = require(`@/dict/${this.menuOptions ? this.menuOptions.language : 'english'}.json`)
      Object.values(words).forEach(word => {
        this.words.all.push({
          word: word.toLowerCase(),
          x: 0 - (this.context.measureText(word).width + Math.floor(Math.random() * this.context.measureText(word).width)),
          y: Math.floor(Math.random() * this.canvas.height),
          width: this.context.measureText(word).width,
          color: '#3c366b' // this.randomColor()
        })
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
      return Math.floor((this.score.success + this.score.errors) / (this.score.timeElapsed / 60))
    },
    computeAccuracy () {
      return Math.floor((this.score.success / (this.score.success + this.score.errors)) * 100)
    },
    computeSkillLevel () {
      if (this.score.wpm <= 4) {
        return 'Shameful'
      } else if (this.score.wpm <= 9) {
        return 'Pathetic'
      } else if (this.score.wpm <= 19) {
        return 'Barely trying'
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
      this.clearCanvas()

      if (!this.timestep.last) {
        this.timestep.last = this.timestamp()
      }

      for (let i = 0; i < this.words.displayed.length; i++) {
        const word = this.words.displayed[i]

        if (word.x > this.canvas.width) {
          this.removeWord(word)
          this.score.missed += 1

          if (this.score.missed >= this.gameOptions.missesToLose) {
            break
          }

          continue
        }

        word.x += Math.cbrt(this.gameOptions.intensity) // Math.cbrt(this.gameOptions.intensity * this.timestep.dt)

        this.drawSingleWord(word)
      }

      if (this.score.missed >= this.gameOptions.missesToLose) {
        window.removeEventListener('resize', this.resizeCanvas)
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
        if (this.score.timeElapsed % 60 === 0) {
          this.gameOptions.wordsToAdd += 1 // kinda makes it too hard
        }
        if (this.score.timeElapsed % 5 === 0) {
          this.displayWords(this.gameOptions.wordsToAdd)
        }
        this.gameOptions.intensity += this.gameOptions.intensityIncreaseRate
      }

      this.timestep.last = this.timestep.now

      requestAnimationFrame(this.drawWords)
    },
    drawSingleWord (word) {
      if (word.x >= this.canvas.width - this.canvas.width / 3) {
        this.context.fillStyle = '#c53030'
      } else if (word.x >= this.canvas.width - (this.canvas.width / 3) * 2) {
        this.context.fillStyle = '#ecc94b'
      } else {
        this.context.fillStyle = word.color
      }

      this.context.fillText(word.word, word.x, word.y)
    },
    scoreWord () {
      const wordToDelete = this.words.displayed.find(word => {
        if (this.menuOptions && !this.menuOptions.accents) {
          return this.noAccents(word.word) === this.userInput.toLowerCase()
        }

        return word.word === this.userInput.toLowerCase()
      })

      if (wordToDelete) {
        this.score.success += 1
        this.removeWord(wordToDelete)
      } else {
        this.score.errors += 1
      }

      this.userInput = ''
    }
  }
}
</script>
