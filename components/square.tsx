import { FunctionComponent } from "react";
import styles from '../styles/Home.module.css'

const Square: FunctionComponent<SquareProps> = ({ square, isFinished, value, handleClick }: SquareProps) => {


    return <div className={styles.square} style={{ cursor: isFinished ? "default" : "pointer" }} onClick={() => handleClick(square)}>
        <p className={styles.square_text}>{value}</p>
    </div>
}

export default Square;

type SquareProps = {
    square: number,
    currentTurn?: string;
    toggleTurn?: (square: number) => void;
    isFinished?: boolean;
    handleClick: (square: number) => void;
    value: string;
}