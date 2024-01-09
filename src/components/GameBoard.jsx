import { useState } from "react"

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard({onSelectSquare, activePlayerSymbol}){

    const [gameBoard, setGameBoard] = useState(initialGameBoard)

    function handleClickedSquare(rowIndex, colIndex){
        setGameBoard((prevBoard) => {
            const updatedBoard = [...prevBoard.map(innerArray => [...innerArray])]
            updatedBoard[rowIndex][colIndex]  = activePlayerSymbol
            return updatedBoard
        })

        onSelectSquare()
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