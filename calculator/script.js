var currentValue = ""
var currentOperator = ""
var previuosValue = ""
var flag = false
function getNumber(number) {
    if (flag) {
        currentValue = ''
        flag = false
    }

    currentValue += number
    console.log("number", currentValue);

    document.getElementById('display').placeholder = ` ${previuosValue}  ${currentOperator} ${currentValue} `
    console.log("flag", flag);
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
    console.log("flag", flag);
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
            flag = true
            console.log("flag", flag);
            calculate()
        } else {
            getOperator(key)
        }
    }
    console.log("flag", flag);
})


const canBtn = document.getElementById('cancel')
canBtn.addEventListener('click', clear)

function clear() {
    console.log("data cleared");

    currentValue = ''
    currentOperator = ''
    previuosValue = ''
    document.getElementById('display').placeholder = 0
    console.log("flag", flag);
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
        case '=':
            flag = true
            console.log("flag", flag);

            break

        case '/':
            if (curValue === 0) {
                document.getElementById('display').placeholder = 'Error'
                return;
            }
            result = (preValue / curValue).toFixed(4)

            break
        default:
            break

    }
    currentValue = result.toString()


    previuosValue = ''
    currentOperator = ''
    document.getElementById('display').placeholder = `${currentValue}`;
    console.log("flag", flag);

}

const Eqbtn = document.getElementById('equals')
Eqbtn.addEventListener('click', () => {
    flag = true
    calculate()
})