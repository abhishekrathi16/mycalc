class Calculator {
  constructor(dataprev, datacurr) {
    this.dataprev = dataprev
    this.datacurr = datacurr
    this.clear()
  }

  clear() {
    this.curr = ''
    this.prev = ''
    this.operation = undefined
  }

  delete() {
    this.curr = this.curr.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.curr.includes('.')) return
    this.curr = this.curr.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.curr === '') return
    if (this.prev !== '') {
      this.compute()
    }
    this.operation = operation
    this.prev = this.curr
    this.curr = ''
  }

  compute() {
    let calculations
    const previous = parseFloat(this.prev)
    const current = parseFloat(this.curr)
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        calculations = previous + current
        break
      case '-':
        calculations = previous - current
        break
      case '*':
        calculations = previous * current
        break
      case '/':
        calculations = previous / current
        break
      default:
        return
    }
    this.curr = calculations
    this.operation = undefined
    this.prev = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.datacurr.innerText =
      this.getDisplayNumber(this.curr)
    if (this.operation != null) {
      this.dataprev.innerText =
        `${this.getDisplayNumber(this.prev)} ${this.operation}`
    } else {
      this.dataprev.innerText = ''
    }
  }
}


const numbers = document.querySelectorAll('[data-number]')
const operations = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const del = document.querySelector('[data-delete]')
const clear = document.querySelector('[data-all-clear]')
const dataprev = document.querySelector('[data-previous-operand]')
const datacurr = document.querySelector('[data-current-operand]')

const calculator = new Calculator(dataprev, datacurr)

numbers.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operations.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equals.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

clear.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

del.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})