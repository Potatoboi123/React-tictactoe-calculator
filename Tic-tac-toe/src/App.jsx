import { useState } from "react"

import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx"
import GameOver from "./components/GameOver.jsx"

import {WINNING_COMBINATIONS} from './winning-combinations.js'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer='x';
  if(gameTurns.length>0 && gameTurns[0].player==='x'){
    currentPlayer='o';
  }
  return currentPlayer;
}

function App() {

  const [players,setPlayers]=useState({
    x:'Player 1',
    o:'Player 2'
  })
  const [gameTurns,setGameTurns]=useState([]);
  const activePlayer=deriveActivePlayer(gameTurns)

  let gameBoard=[...initialGameBoard.map((array)=> [...array])];
  let winner;
  for(let turn of gameTurns){
      const {square,player}=turn;
      const {row,col}=square;
      gameBoard[row][col]=player;
  }

  for(const combination of WINNING_COMBINATIONS){

    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner=players[firstSquareSymbol];
    }

  }

  let hasDraw= gameTurns.length===9 && !winner;
  
  function handleSelectSquare(rowIndex,colIndex){

    setGameTurns((prevTurns)=>{

      let currentPlayer=deriveActivePlayer(prevTurns);
      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurns];

      return updatedTurns;
    })
  }

  function handleReset(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,name){

    setPlayers(prevPlayers=>{
      return {
        ...prevPlayers,
        [symbol]:name
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName='Player1' symbol='x' isActive={activePlayer==='x'} onChangeName={handlePlayerNameChange}></Player>
          <Player initialName='Player2' symbol='o' isActive={activePlayer==='o'} onChangeName={handlePlayerNameChange}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleReset}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
