import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Square from '../components/square'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  const [squareValues, setSquareValues] = useState(["", "", "", "", "", "", "", "", ""])
  //an array called squares from 0-9
  const [currentTurn, setCurrentTurn] = useState("X")
  const [isFinished, setIsFinished] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
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

  }, [currentTurn, squareValues])
  const handleClick = (index: number) => {
    if (squareValues[index] === "" && !isFinished) {
      const tempSquares = squareValues.slice();
      tempSquares[index] = currentTurn;
      setSquareValues(tempSquares);
      setCurrentTurn(currentTurn === "X" ? "O" : "X")
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
  return <div className={styles.rootdiv}>
    <div className={styles.mainBoard}>
      {comps}

    </div>
    <button onClick={resetGame}>Reset Game</button>
    <h3 className={styles.turntext}>{currentTurn}&apos;s Turn</h3>
  </div >
}


function checkForWinners(squaresArray: string[]): boolean {
  var isFull = true;
  for (var str in squaresArray) {
    if (str === "") {
      isFull = false;
    }
  }

  if (isFull) {
    return threeStringsAreSame([squaresArray[0], squaresArray[1], squaresArray[2]]) ||
      threeStringsAreSame([squaresArray[3], squaresArray[4], squaresArray[5]]) ||
      threeStringsAreSame([squaresArray[6], squaresArray[7], squaresArray[8]]) ||
      threeStringsAreSame([squaresArray[0], squaresArray[3], squaresArray[6]]) ||
      threeStringsAreSame([squaresArray[1], squaresArray[4], squaresArray[7]]) ||
      threeStringsAreSame([squaresArray[2], squaresArray[5], squaresArray[8]]) ||
      threeStringsAreSame([squaresArray[0], squaresArray[4], squaresArray[8]]) ||
      threeStringsAreSame([squaresArray[2], squaresArray[4], squaresArray[6]])

  }
  return false
}
export default Home


function threeStringsAreSame(array: string[]) {
  return array[0] === array[1] && array[1] === array[2] && array[0] !== ""
}