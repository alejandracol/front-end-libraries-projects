const numberRegExp = /-?[1-9]\d*[.]?\d*|-?0[.]\d*/
const operators = ["÷", "×", "-", "+"]
const precision = 100000000000000

let performExpression = (expression) => {
    expression = expression.map((currVal, ind, arr) => {
        if (/π/.test(currVal)) {
            let number = currVal.match(numberRegExp) ? Number(currVal.match(numberRegExp)[0]) : 1
            return number * Math.PI
        }
        else if (/%/.test(currVal)) {
            let number = Number(arr[ind - 2]) || 1
            let percent = currVal.match(numberRegExp) ? Number(currVal.match(numberRegExp)[0]) : 0
            return number * percent / 100
        }
        else if (/0/.test(currVal) || numberRegExp.test(currVal)) {
            return Number(currVal)
        }
        else if (/[×|÷]-/.test(currVal)) {
            arr[ind + 1] = currVal[1] + arr[ind + 1]
            return currVal[0]
        }
        else {
            return currVal
    }})  

    operators.forEach(operator => {
        if (expression.includes(operator)) {
            expression = performOperation(expression, operator)
        }
    })

    return (Math.round(expression[0] * precision) / precision).toString()
}


let performOperation = (expression, operator) => {
    let n = expression.indexOf(operator)
    let x = expression[n - 1]
    let y = expression[n + 1]
    let result;
    let newExpression;

    switch (operator) {
        case '+':
            result = x + y
            break
        case '-':
            result = x - y
            break
        case '×':
            result = x * y
            break
        case '÷':
            result = x / y
            break
        default:
            console.log("Sorry, something went wrong");
    }

    if (expression.length > 3) { 
        let realArr = expression.slice(n + 2) || []
        newExpression = expression.slice(0, n - 1).concat(result).concat(realArr)
    }
    else {
        newExpression = [result]
    }

    return newExpression.includes(operator)
        ? performOperation(newExpression, operator)
        : newExpression
}

export { performExpression }
