import { useState } from "react";
import Log from "./components/Log";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import {WINNING_COMBINATIONS} from './winning-combinations'
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

// helper function
function deriveActivePlayer(gameTurns){

  let currentPlayer = 'X'
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer
}

function App() {

  const [players, setPlayers]= useState({
    X: 'P1',
    O: 'P2'
  })

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(array => [...array])]

    for(const turn of gameTurns){
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
    }
  }

  const isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    
    setGameTurns(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns]

      return updatedTurns
    });

    
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlerPlayerNameChange(symbol, newName){
    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol] : newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="P1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlerPlayerNameChange}></Player>
          <Player initialName="P2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlerPlayerNameChange}></Player>
        </ol>
        {(winner || isDraw )&& <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
