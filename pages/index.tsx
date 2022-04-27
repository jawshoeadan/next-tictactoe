import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
// Importing React Hook functions
import Square from '../components/square'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  const [squareValues, setSquareValues] = useState(["", "", "", "", "", "", "", "", ""])
  //an array called squares from 0-9
  const [currentTurn, setCurrentTurn] = useState("X")
  const [isFinished, setIsFinished] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  //The useState hook returns a variable carrying a value and a function used to change the value
  function oppositeCurrentTurn() {
    if (currentTurn === "X") {
      return "O"
    } else {
      return "X"
    }
  }

  useEffect(() => {
    checkForWinners(squareValues)
  }
    , [currentTurn, squareValues])
  //useEffect in React will rerun each time the program sets currentTurn or squareValues
  const handleClick = (index: number) => {
    if (squareValues[index] === "" && !isFinished) {
      const tempSquares = squareValues.slice();
      tempSquares[index] = currentTurn;
      setSquareValues(tempSquares);
      setCurrentTurn(oppositeCurrentTurn())
      setTurnCount(turnCount + 1)
      console.log(turnCount)
      if (turnCount >= 8) {
        setIsFinished(true);
        alert("No one won.")
      }
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
  if (!isFinished) {
    return <div className={styles.rootdiv}>
      <div className={styles.mainBoard}>
        {comps}

      </div>

      <h3 className={styles.turntext}>{currentTurn}&apos;s Turn</h3>
    </div >

  }
  else {
    return <div className={styles.rootdiv}>
      <div className={styles.mainBoard}>
        {comps}

      </div>
      <button onClick={resetGame}>Reset Game</button>

    </div >
  }
  function checkForWinners(squaresArray: string[]): void {
    if (threeStringsAreSame([squaresArray[0], squaresArray[1], squaresArray[2]]) ||
      threeStringsAreSame([squaresArray[3], squaresArray[4], squaresArray[5]]) ||
      threeStringsAreSame([squaresArray[6], squaresArray[7], squaresArray[8]]) ||
      threeStringsAreSame([squaresArray[0], squaresArray[3], squaresArray[6]]) ||
      threeStringsAreSame([squaresArray[1], squaresArray[4], squaresArray[7]]) ||
      threeStringsAreSame([squaresArray[2], squaresArray[5], squaresArray[8]]) ||
      threeStringsAreSame([squaresArray[0], squaresArray[4], squaresArray[8]]) ||
      threeStringsAreSame([squaresArray[2], squaresArray[4], squaresArray[6]])) {
      alert(`${oppositeCurrentTurn()} has won!`)
      setIsFinished(true);
    }

  }
}
export default Home


function threeStringsAreSame(array: string[]) {
  return array[0] === array[1] && array[1] === array[2] && array[0] !== ""
}