import React, { useState, useEffect } from 'react'
import { clockData } from '../services/data'
import { Container, Row, Col } from 'react-bootstrap'
import './ClockPage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faStop } from '@fortawesome/free-solid-svg-icons'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

const secondValue = 1000
const minuteValue = 60 * secondValue
const initialTimerLength = {break: 5, session: 25}
const initialTimerStatus = {running: false, icon: faPlay}
const initialTimerLabel = "session"
const initialTimerValue = initialTimerLength[initialTimerLabel] * minuteValue
const initialAnimationsStatus = ["black", "", "", ""]
let intervalID
let audioElement

export default function ClockPage() {
    const [timerLength, setTimerLength] = useState(initialTimerLength)
    const [timerStatus, setTimerStatus] = useState(initialTimerStatus)
    const [timerLabel, setTimerLabel] = useState(initialTimerLabel)
    const [timerValue, setTimerValue] = useState(initialTimerValue)
    const [animations, setAnimations] = useState(initialAnimationsStatus)
   
    let timerLengthHandler = (value, label) => {
        let newTimerLength = timerLength[label] + value
        if (newTimerLength > 0 && newTimerLength <= 60) {
            if (label === "break") {
                setTimerLength((timerLength) => {
                    return {break: newTimerLength, session: timerLength.session}
                })
                if (timerLabel === label) {
                    setTimerValue(newTimerLength * minuteValue)
                    setAnimations(initialAnimationsStatus)
                }
            } else {
                setTimerLength((timerLength) => {
                    return {break: timerLength.break, session: newTimerLength}
                })
                if (timerLabel === label) {
                    setTimerValue(newTimerLength * minuteValue)
                    setAnimations(initialAnimationsStatus)
                }
            }
        }
    }

    function timerCreator() {
        intervalID = setInterval(() => {
            setTimerValue((timerValue) => {
                return timerValue - secondValue
            })
        }, secondValue)
    }

    let timerStatusHandler = () => {
        switch (timerStatus.running) {
            case false:
                timerCreator()
                setTimerStatus({running: true, icon: faStop})
                break
            case true:
                clearInterval(intervalID)
                setTimerStatus(initialTimerStatus)
                break
            default:
                console.log("Sorry, something went wrong");
        }
    }

    let notifyAlarm = () => {
        setAnimations(["#973537", "", "", ""])
    }

    let triggerAlarm = () => {
        if (!audioElement) {
            audioElement = document.getElementById("beep")
        }
        audioElement.play()
        setAnimations(["#973537", "bell-1-animation", "antenna-animation", "bell-2-animation"])
        setTimeout(() => {
            setAnimations(initialAnimationsStatus)
        }, secondValue * 0.8)
    }

    useEffect(() => {
        if (timerValue === (minuteValue - secondValue)) {
            notifyAlarm()
        }
        if (timerValue === secondValue) {
            setTimeout(triggerAlarm, secondValue)
            setTimeout(() => {
                if (timerLabel === "session") {
                    setTimerLabel("break")
                    setTimerValue(timerLength["break"] * minuteValue)
                } else {
                    setTimerLabel("session")
                    setTimerValue(timerLength["session"] * minuteValue)
                }
            }, secondValue * 2)
        }
    }, [timerValue])

    let stopAudio = () => {
        if (audioElement) {
          audioElement.pause()
          audioElement.currentTime = 0
        }
    }

    let timerResetHandler = () => {
        clearInterval(intervalID)
        stopAudio()
        setTimerLength(initialTimerLength)
        setTimerStatus(initialTimerStatus)
        setTimerLabel(initialTimerLabel)
        setTimerValue(initialTimerValue)
        setAnimations(initialAnimationsStatus)
    }

    return (
        <div className="wrap clock">
            <div className="top-elements-clock">
                <div className={`bell-1 ${animations[1]}`}></div>
                <div className={`antenna ${animations[2]}`}></div>
                <div className={`bell-2 ${animations[3]}`}></div>
            </div>

            <Container className="d-flex flex-column align-items-center justify-content-center text-center">
                <Row className="w-100">
                    <TimerLengthComponent label="break" value={timerLength.break} buttonDisabled={timerStatus.running} timerLengthHandler={timerLengthHandler} faMinus={faMinus} faPlus={faPlus} />
                    <TimerLengthComponent label="session" value={timerLength.session} buttonDisabled={timerStatus.running} timerLengthHandler={timerLengthHandler} faMinus={faMinus} faPlus={faPlus} />
                </Row>
                <Row>
                    <TimerComponent label={timerLabel} value={timerValue} timeColor={animations[0]} />
                </Row>
                <Row>
                    <Col>
                        <button id="start_stop" onClick={() => timerStatusHandler()}><FontAwesomeIcon icon={timerStatus.icon} /></button>
                        <button id="reset" onClick={() => timerResetHandler()}><FontAwesomeIcon icon={faSyncAlt} /></button>
                    </Col>
                </Row>     
            </Container>

            <div className="bottom-elements-clock">
                <div className="foot-1"></div>
                <div className="foot-2"></div>
            </div>

            <footer className="mt-4">
                <small>Sound Effect by <a href="https://www.youtube.com/channel/UC6xAhVAa_R2vJPVKDY_-kuw" target="_blank" rel="noopener noreferrer">Sześcian</a></small>
            </footer>
        </div>
    )
}

function TimerLengthComponent({label, value, buttonDisabled, timerLengthHandler, faMinus, faPlus}) {
    return (
        <Col>
            <div id={`${label}-label`}>{`${label} length`}</div>
            <button disabled={buttonDisabled} id={`${label}-decrement`} onClick={() => timerLengthHandler(-1, label)}><FontAwesomeIcon icon={faMinus} /></button>
            <div className="length-value" id={`${label}-length`}>{value}</div>
            <button disabled={buttonDisabled} id={`${label}-increment`} onClick={() => timerLengthHandler(1, label)}><FontAwesomeIcon icon={faPlus} /></button>
        </Col>
    )
}

function TimerComponent({label, value, timeColor}) {
    let timeLeft = value === 60 * minuteValue ? "60:00" : new Date(value).toISOString().substr(14, 5)
    return (
        <Col xs="auto" className="output mt-3 px-4 py-1 rounded">
            <div id="timer-label">{label}</div>
            <div style={{fontSize: "200%", color: timeColor}} id="time-left">{timeLeft}</div>
            <audio src={clockData} type="audio/mpeg" id="beep"></audio>
        </Col>
    )
}