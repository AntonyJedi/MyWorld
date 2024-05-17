import React from "react";
import Square from "./Square";

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Board = ({ xIsNext, squares, onPlay }) => {

  const handleClick = i => {
    if(squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice()
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O';
    onPlay(nextSquares)
  }

  const renderRow = start => {
    const row = [];
    for (let i = start; i < start + 3; i++) {
      row.push(<Square key={i} value={squares[i]} id={i} click={handleClick}/>)
    }
    return row;
  }

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < 9; i += 3) {
      board.push(
        <div key={i} className='board-row'>
          {renderRow(i)}
        </div>
      )
    }
    return board
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner is - ${winner}`
  } else {
    status = `Next player is - ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <>
      <div className='status'>{status}</div>
      {renderBoard()}
    </>
  );
};

export default Board;