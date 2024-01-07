import { useState } from "react"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard(){

    const [gameBoard, setGameBoard] = useState(initialGameBoard)

    function handleClickedSquare(rowIndex, colIndex){
        setGameBoard((prevBoard) => {
            const updatedBoard = [...prevBoard.map(innerArray => [...innerArray])]
            updatedBoard[rowIndex][colIndex]  = 'X'
            return updatedBoard
        })
    }
    return (

            <ol id="game-board">
                {gameBoard.map((row, rowIndex) =>{
                    return <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={() => handleClickedSquare(rowIndex, colIndex)}>{playerSymbol}</button></li>)}
                        </ol>
                    </li>
                })}
            </ol>
    )
}