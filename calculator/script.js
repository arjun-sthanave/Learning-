var currentValue = ""
var currentOperator = ""
var previuosValue = ""

function getNumber(number) {
    currentValue += number
    console.log("number", currentValue);

    document.getElementById('display').placeholder = ` ${previuosValue}  ${currentOperator} ${currentValue} `
}

function getOperator(operator) {
    if (currentValue == '') {
        return
    }
    if (previuosValue != '') {
        calculate()
    }
    currentOperator = operator
    console.log("current opertor", currentOperator);


    previuosValue = currentValue
    currentValue = ''
    document.getElementById('display').placeholder = ` ${previuosValue} ${currentOperator}`

}

window.addEventListener('keydown', (event) => {
    const key = event.key
    if (key >= 0 && key < 10) {
        getNumber(key)
    }
    if (key == 'Escape') {
        clear()

    }

    if (key == '+' || key == '-' || key == '/' || key == '*' || key == '=' || key == 'Enter') {
        if (key == '=' || key == 'Enter') {
            calculate()
        } else {
            getOperator(key)
        }
    }
})


const canBtn = document.getElementById('cancel')
canBtn.addEventListener('click', clear)

function clear() {
    console.log("data cleared");

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
    let curValue = parseFloat(currentValue)
    let preValue = parseFloat(previuosValue)
    console.log("cur", curValue);
    console.log("cur", preValue);



    switch (currentOperator) {
        case '*':
            result = preValue * curValue
            break

        case '+':
            result = preValue + curValue
            break

        case '-':
            result = preValue - curValue
            break

        case '/':
            if (curValue === 0) {
                alert("Cannot divide by zero");

                return;
            }
            result = Math.floor(preValue / curValue)

            break
        default:
            break

    }
    currentValue = result.toString()


    previuosValue = ''
    currentOperator = ''
    document.getElementById('display').placeholder = `${currentValue}`;

}
