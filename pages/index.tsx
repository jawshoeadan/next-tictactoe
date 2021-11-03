import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Square from '../components/square'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  const [squareValues, setSquareValues] = useState(["", "", "", "", "", "", "", "", ""])
  //an array called squares from 0-9
  const [currentTurn, setCurrentTurn] = useState("X")
  const [isFinished, setIsFinished] = useState(false);
  function oppositeCurrentTurn() {
    if (currentTurn === "X") {
      return "O"
    } else {
      return "X"
    }
  }
  useEffect(() => {
    if (checkForWinners(squareValues)) {
      alert(`${oppositeCurrentTurn()} has won!`)
      setIsFinished(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTurn, squareValues])
  const handleClick = (index: number) => {
    if (squareValues[index] === "" && !isFinished) {
      const tempSquares = squareValues.slice();
      tempSquares[index] = currentTurn;
      setSquareValues(tempSquares);
      setCurrentTurn(currentTurn === "X" ? "O" : "X")

    }
  }
  const resetGame = () => {
    location.reload()
  }
  const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const comps = squares.map((square) => (
    <Square key={square} square={square} handleClick={handleClick} value={squareValues[square]} isFinished={isFinished} />
  )
  )
  return <div className={styles.rootdiv}>
    <div className={styles.mainBoard}>
      {comps}

    </div>
    <button onClick={resetGame}>Reset Game</button>
    <h3 className={styles.turntext}>{currentTurn}&apos;s Turn</h3>
  </div >
}


function checkForWinners(array: string[]): boolean {
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