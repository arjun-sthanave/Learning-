var currentValue = ""
var operator = ""
var previuosValue = ""

function getNumber(number) {
    currentValue += number
    console.log("number", currentValue);

    document.getElementById('display').placeholder = `${previuosValue} ${currentValue}`
}