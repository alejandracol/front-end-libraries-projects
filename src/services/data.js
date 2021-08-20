import React from 'react'

import QuotePage from '../components/QuotePage'
import MarkdownPage from '../components/MarkdownPage'
import DrumPage from '../components/DrumPage'
import CalculatorPage from '../components/CalculatorPage'
import ClockPage from '../components/ClockPage'
import quoteImg from '../multimedia/quote-img.png'
import markdownImg from '../multimedia/markdown-img.png'
import drumImg from '../multimedia/drum-img.png'
import calculatorImg from '../multimedia/calculator-img.png'
import clockImg from '../multimedia/clock-img.png'

import owlImg0 from '../multimedia/owl-img0.png'
import owlImg1 from '../multimedia/owl-img1.png'
import owlImg2 from '../multimedia/owl-img2.png'
import owlImg3 from '../multimedia/owl-img3.png'

import clipQ from '../multimedia/left-u-into-otis-mcdonald.mp3'
import clipW from '../multimedia/takeoff-ethan-meixsell.mp3'
import clipE from '../multimedia/slay-well-gunnar-olsen.mp3'
import clipA from '../multimedia/stay-otis-mcdonald.mp3'
import clipS from '../multimedia/double-helix-ethan-meixsell.mp3'
import clipD from '../multimedia/your-intro-audionautix.mp3'
import clipZ from '../multimedia/howling-gunnar-olsen.mp3'
import clipX from '../multimedia/leavin-mk2.mp3'
import clipC from '../multimedia/operator-error-gunnar-olsen.mp3'

import ClipBeep from '../multimedia/alarm-clock-szescian.mp3'


const PROJECTS = [
  { name: "Random Quote Machine", src: quoteImg, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", component: <QuotePage /> },
  { name: "Markdown Previewer", src: markdownImg, description: "Nunc aliquam augue eleifend ante congue lacinia.", component: <MarkdownPage /> },
  { name: "Drum Machine", src: drumImg, description: "Donec quis magna a sem vestibulum dapibus in nec justo.", component: <DrumPage /> },
  { name: "JavaScript Calculator", src: calculatorImg, description: "Praesent et est pharetra, tristique libero vitae, rhoncus dolor.", component: <CalculatorPage /> },
  { name: "25 + 5 Clock", src: clockImg, description: "Sed non mi vitae augue ultrices tincidunt.", component: <ClockPage /> }
]

const quoteData = [ owlImg0, owlImg1, owlImg2, owlImg3 ]

const drumData = {
  animation: "https://media.giphy.com/media/3ohzh4c0dSBPQ7FZFS/giphy.gif",
  clips: [
  { key: "Q", name: "Left U Into (Sting)", author: "- Otis McDonald", src: clipQ, col: 12 },
  { key: "W", name: "Takeoff (Sting)", author: "- Ethan Meixsell", src: clipW, col: 6 }, 
  { key: "E", name: "Slay Well (Sting)", author: "- Gunnar Olsen", src: clipE, col: 6 }, 
  { key: "A", name: "Stay (Sting)", author: "- Otis McDonald", src: clipA, col: 4 },
  { key: "S", name: "Double Helix (Sting)", author: "- Ethan Meixsell", src: clipS, col: 4 }, 
  { key: "D", name: "Your Intro", author: "- Audionautix", src: clipD, col: 4},
  { key: "Z", name: "Howling (Sting)", author: "- Gunnar Olsen", src: clipZ, col: 6 }, 
  { key: "X", name: "Leavin (Sting)", author: "- MK2n", src: clipX, col: 6 }, 
  { key: "C", name: "Operator Error (Sting)", author: "- Gunnar Olsen", src: clipC, col: 12 }
  ]
}

const calculatorData = [
  {calculatorKey: "C", keyboardKey: "C", id: "clear"},
  {calculatorKey: "🡠", keyboardKey: "Backspace", id: "delete"},
  {calculatorKey: "%", keyboardKey: "%", id: "percentage"},
  {calculatorKey: "÷", keyboardKey: "/", id: "divide"},
  {calculatorKey: "7", keyboardKey: "7", id: "seven"},
  {calculatorKey: "8", keyboardKey: "8", id: "eight"},
  {calculatorKey: "9", keyboardKey: "9", id: "nine"},
  {calculatorKey: "×", keyboardKey: "*", id: "multiply"},
  {calculatorKey: "4", keyboardKey: "4", id: "four"},
  {calculatorKey: "5", keyboardKey: "5", id: "five"},
  {calculatorKey: "6", keyboardKey: "6", id: "six"},
  {calculatorKey: "-", keyboardKey: "-", id: "subtract"},
  {calculatorKey: "1", keyboardKey: "1", id: "one"},
  {calculatorKey: "2", keyboardKey: "2", id: "two"},
  {calculatorKey: "3", keyboardKey: "3", id: "three"},
  {calculatorKey: "+", keyboardKey: "+", id: "add"},
  {calculatorKey: "π", keyboardKey: "xoxo", id: "pi"},
  {calculatorKey: "0", keyboardKey: "0", id: "zero"},
  {calculatorKey: ".", keyboardKey: ".", id: "decimal"},
  {calculatorKey: "=", keyboardKey: "Enter", id: "equals"}
  ]

  const clockData = ClipBeep

export { PROJECTS, quoteData, drumData, calculatorData, clockData }