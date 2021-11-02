import { FunctionComponent, useEffect, useState } from "react";
import styles from '../styles/Home.module.css'

const Square: FunctionComponent<SquareProps> = ({ square, currentTurn, toggleTurn, isFinished }: SquareProps) => {
    const [value, setValue] = useState('');

    function handleClick() {

        if (value === '' && !isFinished) {
            setValue(currentTurn);
            toggleTurn(square)

        }
    }
    return <div onClick={handleClick} className={styles.square}>
        <p className={styles.square_text}>{value}</p>
    </div>
}

export default Square;

type SquareProps = {
    square: number,
    currentTurn: string;
    toggleTurn: (square: number) => void;
    isFinished: boolean;
}