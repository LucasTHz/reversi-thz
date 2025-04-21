import React from 'react';

type Cell = 0 | 1 | 2;
type BoardType = Cell[][];
interface BoardProps {
	board: BoardType;
	validMoves: boolean[][];
	onClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, validMoves, onClick }) => {
	console.log('board', board);
	return (
		<div className="grid grid-cols-8 border-4 border-green-800">
			{board.map((row, r) =>
				row.map((cell, c) => (
					<div
						key={`${r}-${c}`}
						className="w-12 h-12 bg-green-600 relative flex items-center justify-center cursor-pointer hover:bg-green-500"
						onClick={() => onClick(r, c)}
					>
						{cell === 1 && <div className="w-8 h-8 bg-black rounded-full" />}
						{cell === 2 && <div className="w-8 h-8 bg-white rounded-full border" />}
						{cell === 0 && validMoves[r][c] && <div className="w-3 h-3 bg-gray-200 rounded-full opacity-75" />}
					</div>
				))
			)}
		</div>
	);
};

export default Board;
