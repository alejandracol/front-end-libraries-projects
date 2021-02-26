import React, { useState } from 'react'


export default function ClockPage() {
    const [breakLength, setBreakLength] = useState(5)
    const [sessionLength, setSessionLength] = useState(25)

    let breakLengthHandler = value => {
        let newBreakLength = breakLength + value
        if (newBreakLength > 0 && newBreakLength <= 60) {
            setBreakLength(newBreakLength)
        }
    }

    let sessionLengthHandler = value => {
        let newSessionLength = sessionLength + value
        if (newSessionLength > 0 && newSessionLength <= 60) {
            setSessionLength(newSessionLength)
        }
    }

    return (
        <div className="wrap clock">
            <header>SESSION CREATOR</header>

            <label for="break-length" id="break-label">Break Length</label>
            <span id="break-decrement" onClick={() => breakLengthHandler(-1)}>-</span>
            <input type="number" id="break-length" name="break-length" value={breakLength}></input>
            <span id="break-increment" onClick={() => breakLengthHandler(1)}>+</span>

            <label for="session-length" id="session-label">Session Length</label>
            <span id="session-decrement" onClick={() => sessionLengthHandler(-1)}>-</span>
            <input type="number" id="session-length" name="session-length" value={sessionLength}></input>
            <span id="session-increment" onClick={() => sessionLengthHandler(1)}>+</span>


            

        </div>
    )
}