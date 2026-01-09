var currentValue = ""
var currentOperator = ""
var previuosValue = ""

function getNumber(number) {
    currentValue += number
    console.log("number", currentValue);

    document.getElementById('display').placeholder = `${previuosValue} ${currentOperator} ${currentValue}`
}

function getOperator(operator) {
    if (currentValue == '') {
        currentOperator = ''
    }
    if (previuosValue != '') {
        calculate()
    }
    currentOperator = operator

    previuosValue = currentValue
    currentValue = ''
    document.getElementById('display').placeholder = ` ${previuosValue} ${currentOperator}`

}

window.addEventListener('keydown', (event) => {
    console.log("event", event.key);
    if (event.key >= 0 && event.key <= 10) {
        getNumber(event.key)
    }
    if (event.key == 'Escape') {
        clear()

    }
})

function clear() {
    currentValue = ''
    currentOperator = ''
    previuosValue = ''
    document.getElementById('display').placeholder = 0
}


function calculate() {
    if (currentValue == '' || previuosValue == '') {
        return
    }
    let result
    let curValue = parseInt(currentValue)
    let preValue = parseInt(previuosValue)
    console.log("cur", curValue);
    console.log("cur", preValue);



    switch (currentOperator) {
        case '*':
            result = curValue * preValue
            break

        case '+':
            result = curValue + preValue
            break

        case '-':
            result = curValue - preValue
            break

        case '/':
            result = Math.floor(curValue * preValue)
            break
        default:
            break

    }
    previuosValue = result.toString()
    console.log("result", previuosValue);

    currentValue = ''
    currentOperator = ''
    document.getElementById('display').placeholder = ` ${previuosValue} ${currentOperator}`;

}