import React, { useState, useEffect, useRef } from 'react'
import { calculatorData } from '../services/data'
import { performExpression } from '../services/requestCalculation'
import { ButtonGroup, Button, Card } from 'react-bootstrap'
import './CalculatorPage.scss'

let keyboardKeys;
let calculatorKeys;
const operatorRegExp = /[×|÷]-?$|[+]$|-$/
const numberPIPRegExp = /[1-9]\d*[.]?\d*[π|%]?|0[.]\d*[π|%]?|π|0%/
const theme = "danger"

export default function CalculatorPage() {
    const [display, setDisplay] = useState("0");
    const [record, setRecord] = useState([]);
    const [result, setResult] = useState(false);
 
    let listenToKeyboardEvents = e => {
        if (keyboardKeys.includes(e.key)) {
            let index = keyboardKeys.indexOf(e.key)
            let calculatorKey = calculatorKeys[index]
            inputHandler(calculatorKey)
        }
    }

    useEffect(() => {
        keyboardKeys = calculatorData.map(key => key.keyboardKey)
        calculatorKeys = calculatorData.map(key => key.calculatorKey)
        document.addEventListener("keyup", listenToKeyboardEvents)
        return () => document.removeEventListener("keyup", listenToKeyboardEvents);
    })

    let inputHandler = (key) => {
        if (key === "C") {
            setDisplay("0")
            setRecord([])
            setResult(false)
        } 
        else if (key === "🡠") {
            if (result) {
                setDisplay("0")
                setRecord([])
                setResult(false)
            }
            else {
                setDisplay(record.pop() || "0")
                setRecord(record.slice(0, record.length))
            }
        }
        else if (operatorRegExp.test(key)) {
            let operator;
            if (result) {
                operator = key
                setRecord([display])
                setResult(false)
            }
            else if (!operatorRegExp.test(display)) {
                setRecord(record.concat(display))
                operator = key
            }
            else {
                operator = display + key
            }
            setDisplay(operator.match(operatorRegExp)[0])
        }
        else if (key === "=") {
            if (result) {
                setRecord([display + key])
            }
            else {
                let expression;
                if (operatorRegExp.test(display)) {
                    expression = record.concat(display).concat("0")
                }
                else {
                    expression = record.concat(display)
                }
                setRecord(expression.concat(key))
                setDisplay(performExpression(expression))
                setResult(true)
            }
        }
        else {
            let number;
            if (result) {
                number = "0" + key
                setRecord([])
                setResult(false)
            }
            else if (operatorRegExp.test(display)) {
                    number = "0" + key
                    setRecord(record.concat(display))
            }
            else {
                number = display + key
            }
            setDisplay(number.match(numberPIPRegExp) ? number.match(numberPIPRegExp)[0] : "0")
        }
    }

    //Scroll bar auto scrolling with added content

    let recordElement = useRef(null)
    let displayElement = useRef(null)

    useEffect(() => {
        let scrollTopValue = recordElement.current.scrollHeight - recordElement.current.offsetHeight
        if (scrollTopValue > 0) {
            recordElement.current.scrollTop = scrollTopValue
        }
    }, [record])

    useEffect(() => {
        let scrollLeftValue = displayElement.current.scrollWidth - displayElement.current.offsetWidth
        if (scrollLeftValue > 0) {
            displayElement.current.scrollLeft = scrollLeftValue
        }
    }, [display])

    return (
        <div className="wrap calculator">
            <Card>
                <Card.Img variant="top" className="rounded" />
                <Card.ImgOverlay className="rounded">
                    <section id="record" className="text-muted" ref={recordElement}>
                        <small>{record}</small>
                    </section>
                    <section id="display" className={`border-top border-${theme}`} ref={displayElement}>
                        {display}
                    </section>
                </Card.ImgOverlay>
                <Card.Body>
                    <ButtonGroup className="flex-wrap">
                        {
                            calculatorData.map(key =>
                                <Button
                                    variant={/=/.test(key.calculatorKey) ? theme : "light"}
                                    id={key.id}
                                    key={key.calculatorKey}
                                    className={/[^0-9=]/.test(key.calculatorKey) ? `text-${theme} rounded` : "rounded"}
                                    onClick={() => inputHandler(key.calculatorKey)}
                                >
                                    {key.calculatorKey}
                                </Button>
                            )
                        }
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </div>
    )
}