import React from 'react';
import { Player, BoardState } from '../types/game';

interface BoardProps {
	board: BoardState;
	validMoves: number[][];
	onClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, validMoves, onClick }) => {
	const isValidMove = (row: number, col: number): boolean => {
		return validMoves.some(([r, c]) => r === row && c === col);
	};

	return (
		<div className="grid grid-cols-8 gap-1 bg-green-800 p-2">
			{board.map((row, rowIndex) =>
				row.map((cell, colIndex) => (
					<div
						key={`${rowIndex}-${colIndex}`}
						className={`w-12 h-12 flex items-center justify-center cursor-pointer
              ${isValidMove(rowIndex, colIndex) ? 'bg-green-600' : 'bg-green-700'}`}
						onClick={() => onClick(rowIndex, colIndex)}
					>
						{cell !== Player.EMPTY && (
							<div
								className={`w-10 h-10 rounded-full
                ${cell === Player.BLACK ? 'bg-black' : 'bg-white'}`}
							/>
						)}
					</div>
				))
			)}
		</div>
	);
};

export default Board;
