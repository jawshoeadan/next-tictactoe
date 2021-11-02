import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Square from '../components/square'
import styles from '../styles/Home.module.css'

var squareValues = ["", "", "", "", "", "", "", "", ""]
const Home: NextPage = () => {

  const [gameFinished, setGameFinished] = useState(false);
  function toggleTurn(square: number) {
    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X')
    squareValues[square] = currentTurn
    if (checkForWinners(squareValues)) {
      setGameFinished(true)
      alert(`${currentTurn} wins!`)




    }
  }
  //an array called squares from 0-9
  const [currentTurn, setCurrentTurn] = useState("X")

  const resetGame = () => {
    squareValues = ["", "", "", "", "", "", "", "", ""];
    setCurrentTurn("X")
    setGameFinished(false);
  }
  const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const comps = squares.map((square) => (
    <Square key={square} square={square} currentTurn={currentTurn} toggleTurn={() => { toggleTurn(square) }} isFinished={gameFinished} />
  )
  )
  return <div className={styles.mainBoard}>
    {comps}
    <button onClick={resetGame}>Reset Game</button>
  </div>
}


function checkForWinners(array: string[]) {
  var isFull = true;
  for (var str in array) {
    if (str === "") {
      isFull = false;
    }
  }

  if (isFull) {
    return threeStringsAreSame([array[0], array[1], array[2]]) ||
      threeStringsAreSame([array[3], array[4], array[5]]) ||
      threeStringsAreSame([array[6], array[7], array[8]]) ||
      threeStringsAreSame([array[0], array[3], array[6]]) ||
      threeStringsAreSame([array[1], array[4], array[7]]) ||
      threeStringsAreSame([array[2], array[5], array[8]]) ||
      threeStringsAreSame([array[0], array[4], array[8]]) ||
      threeStringsAreSame([array[2], array[4], array[6]])

  }
  return false
}
export default Home


function threeStringsAreSame(array: string[]) {
  return array[0] === array[1] && array[1] === array[2] && array[0] !== ""
}