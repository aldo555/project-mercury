const COLOR_DEFAULT = '#3c366b'
const COLOR_WARNING = '#c53030'
const COLOR_DANGER = '#ecc94b'

class Word {
  constructor ({ word, x, y, width }) {
    this.word = word
    this.x = x
    this.y = y
    this.width = width
    this.color = COLOR_DEFAULT
  }

  noAccents () {
    return this.word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  draw (canvas) {
    const context = canvas.getContext('2d')

    if (this.x >= canvas.width - canvas.width / 3) {
      context.fillStyle = COLOR_WARNING
    } else if (this.x >= canvas.width - (canvas.width / 3) * 2) {
      context.fillStyle = COLOR_DANGER
    } else {
      context.fillStyle = this.color
    }

    context.fillText(this.word, this.x, this.y)
  }

  checkCollision (otherWord) {
    // returns true if two words are colliding
    return !(this.x > otherWord.x + otherWord.width ||
      this.x + this.width < otherWord.x ||
      this.y > otherWord.y + this.canvasOptions.textSize ||
      this.y + this.canvasOptions.textSize < otherWord.y)
  }
}

export default Word
