import React, { useEffect, useState, useRef } from 'react'
import { drumData } from '../services/data'
import { Button, Card } from 'react-bootstrap'
import './DrumPage.scss'


export default function DrumPage() {
    const [currKey, setCurrKey] = useState("")
    const [display, setDisplay] = useState({name: "", author: ""})
    const [animation, setAnimation] = useState("")
    const keysArr = drumData.clips.map(clip => clip.key)
    let currAudioElement = document.getElementById(currKey)

    document.addEventListener("keyup", e => {
        let key = e.key.toUpperCase()
        if (keysArr.includes(key)) {
            setCurrKey(key)
        }
    })

    const prevKeyRef = useRef()
    useEffect(() => {
        if (currKey) {
            prevKeyRef.current = currKey
            playAudio()
            displayHandler(currKey)
            setAnimation(drumData.animation)
        }
    }, [currKey])
    const prevKey = prevKeyRef.current

    let playAudio = () => {
        if (prevKey) {
            let prevAudioElement = document.getElementById(prevKey)
            prevAudioElement.pause()
        }

        let playPromise = currAudioElement.play()
        if (playPromise !== undefined) {
            playPromise
            .then(() => console.log("audio played auto"))
            .catch(() => console.log("playback prevented"))
        }
    }

    let displayHandler = (currKey) => {
            let index = keysArr.indexOf(currKey.toUpperCase())
            let {name, author} = drumData.clips[index]
            setDisplay({name, author}) 
    }

    if (currAudioElement) {
        currAudioElement.addEventListener("ended", () => {
            setAnimation("")
        })
    }

    return (
        <div className="wrap drum">
            <Card className="text-center text-white" id="drum-machine">
                <Card.Img variant="top" src={animation} />
                <Card.ImgOverlay id="display">
                    <Card.Title>
                        {display.name}
                    </Card.Title>
                    <Card.Subtitle>
                        {display.author}
                    </Card.Subtitle>
                </Card.ImgOverlay>
                <Card.Body className="row">
                    { drumData.clips.map(({key, src, col}) => {
                        return (
                            <div className={`col-${col}`} key={src}>
                                <Button
                                    variant="link"
                                    className="drum-pad"
                                    id={src}
                                    onClick={() => setCurrKey(key)}
                                >
                                    <audio src={src} type="audio/mpeg" className="clip" id={key} />                               
                                    {key}
                                </Button>
                            </div>
                        )
                    })}
                </Card.Body>
            </Card>
        </div>
    )
}

