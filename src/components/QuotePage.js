import React, { useState, useEffect } from 'react'
import requestQuote from '../services/requestQuote'
import { quoteData } from '../services/data'
import { Button, Card } from 'react-bootstrap'
import './QuotePage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


export default function QuotePage() {
    const [quote, setQuote] = useState({})
    const [theme, setTheme] = useState(0)
    const [animation, setAnimation] = useState("")

    useEffect(() => {
        requestQuote()
            .then(response => setQuote(response))
            .catch(error => {
                console.error(error)
                setQuote({ content: "Opps... Something went wrong" })
            })
    }, [])

    let handleButtom= () => {
        setAnimation("curtin")
        setTimeout(() => {
            requestQuote()
            .then(response => {
                setQuote(response)
                setTheme(() => {
                    return theme === 3 ? 0 : theme + 1
                })
            })
            .catch(error => {
                console.error(error)
                setQuote({ content: "Opps... Something went wrong" })
            })
        }, 1000)
        setTimeout(() => setAnimation(""), 2000)
    } 
    
    return (
        <div className={`wrap quote card-${theme}`}>
            <Card className={`text-center ${animation}`} id="quote-box">
                <img className="mx-auto mt-4 mb-0" src={quoteData[theme]} alt="" />
                <Card.Body>
                    <blockquote className="blockquote mb-0" id="text">
                        <p>
                            <FontAwesomeIcon className="align-top mr-2" icon={faQuoteLeft} />
                            {quote.content}
                        </p>
                        { quote.author && (
                            <footer className="blockquote-footer" id="author">
                                <cite>{quote.author}</cite>
                            </footer>
                        )}
                    </blockquote>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between border-0 mb-2" >
                    <Card.Link 
                        href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${quote.content}" ${quote.author}`}
                        id="tweet-quote"
                        title="Tweet this quote!"
                        target="_blank"
                        className="btn btn-primary"
                    >
                        <FontAwesomeIcon icon={faTwitter} />
                    </Card.Link>
                    <Button 
                        id="new-quote"
                        type="buttom"
                        onClick={handleButtom}
                    >
                        New quote
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}


