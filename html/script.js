

class Calculator {
    constructor (previousElementText, currentElementText){
        this.previousElementText = previousElementText;
        this.currentElementText = currentElementText;
        this.clear();
    }

    clear(){
        this.currentElement = '';
        this.previousElement = '';
        this.operation = undefined;
    }

    delete() {
        this.currentElement = this.currentElement.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentElement.includes('.')) return
        this.currentElement = this.currentElement.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentElement === '') return;
        if (this.previousElement !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousElement = this.currentElement
        this.currentElement = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousElement)
        const current = parseFloat(this.currentElement)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
            default:
                return
        }
        this.currentElement = computation
        this.operation = undefined
        this.previousElement = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentElementText.innerText = 
        this.getDisplayNumber(this.currentElement)
        if(this.operation != null){
            this.previousElementText.innerText = 
            `${this.getDisplayNumber(this.previousElement)} ${this.operation}`
        } else {
            this.previousElementText.innerText = ''
        }
    }
    
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousElementText = document.querySelector('[data-previous-operand]')
const currentElementText = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousElementText, currentElementText)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

document.addEventListener('keydown', function(event) {
    let patternForNumber = /[0-9]/g
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumber)){
        event.preventDefault()
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if (event.key === '.'){
        event.preventDefault()
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
        event.preventDefault()
        calculator.chooseOperation(event.key)
        calculator.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '='){
        event.preventDefault()
        calculator.compute()
        calculator.updateDisplay()
    }

    if (event.key === 'Backspace') {
        event.preventDefault()
        calculator.delete()
        calculator.updateDisplay()
    }

    if (event.key === 'Delete') {
        event.preventDefault()
        calculator.clear()
        calculator.updateDisplay()
    }

});