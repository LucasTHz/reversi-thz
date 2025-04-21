import React, { useState, useEffect } from 'react';
import Board from './Board';

type Cell = 0 | 1 | 2;
type BoardType = Cell[][];

const DIRECTIONS: [number, number][] = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	/*self*/ [0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
];

function initBoard(): BoardType {
	const b: BoardType = Array(8)
		.fill(null)
		.map(() => Array(8).fill(0));
	b[3][3] = 2;
	b[4][4] = 2;
	b[3][4] = 1;
	b[4][3] = 1;
	return b;
}

function getValidMoves(board: BoardType, player: Cell): boolean[][] {
	const valid = Array(8)
		.fill(null)
		.map(() => Array(8).fill(false));
	const opponent: Cell = player === 1 ? 2 : 1;
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			if (board[r][c] !== 0) continue;
			for (const [dr, dc] of DIRECTIONS) {
				let i = r + dr,
					j = c + dc,
					found = false;
				while (i >= 0 && i < 8 && j >= 0 && j < 8 && board[i][j] === opponent) {
					i += dr;
					j += dc;
					found = true;
				}
				if (found && i >= 0 && i < 8 && j >= 0 && j < 8 && board[i][j] === player) {
					valid[r][c] = true;
					break;
				}
			}
		}
	}
	return valid;
}

function applyMove(board: BoardType, r: number, c: number, player: Cell): BoardType {
	const newBoard = board.map((row) => [...row]) as BoardType;
	newBoard[r][c] = player;
	const opponent: Cell = player === 1 ? 2 : 1;
	for (const [dr, dc] of DIRECTIONS) {
		let i = r + dr,
			j = c + dc,
			path: [number, number][] = [];
		while (i >= 0 && i < 8 && j >= 0 && j < 8 && newBoard[i][j] === opponent) {
			path.push([i, j]);
			i += dr;
			j += dc;
		}
		if (path.length && i >= 0 && i < 8 && j >= 0 && j < 8 && newBoard[i][j] === player) {
			for (const [x, y] of path) newBoard[x][y] = player;
		}
	}
	return newBoard;
}

const ReversiGame: React.FC = () => {
	const [board, setBoard] = useState<BoardType>(initBoard());
	const [currentPlayer, setCurrentPlayer] = useState<Cell>(1);
	const [validMoves, setValidMoves] = useState<boolean[][]>(getValidMoves(board, currentPlayer));
	const [gameOver, setGameOver] = useState(false);

	useEffect(() => {
		const moves = getValidMoves(board, currentPlayer);
		setValidMoves(moves);
		if (!moves.some((row) => row.some((v) => v))) {
			const opp = currentPlayer === 1 ? 2 : 1;
			const oppMoves = getValidMoves(board, opp);
			if (!oppMoves.some((row) => row.some((v) => v))) {
				setGameOver(true);
			} else {
				setCurrentPlayer(opp);
			}
		}
	}, [board, currentPlayer]);

	function handleClick(r: number, c: number) {
		if (gameOver || !validMoves[r][c]) return;
		const newBoard = applyMove(board, r, c, currentPlayer);
		setBoard(newBoard);
		setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
	}

	function getScore() {
		let black = 0,
			white = 0;
		board.flat().forEach((cell) => (cell === 1 ? black++ : cell === 2 ? white++ : null));
		return { black, white };
	}

	const score = getScore();

	console.log('score', score);

	return (
		<div className="flex flex-col items-center p-4">
			<h1 className="text-3xl font-bold mb-4">Reversi</h1>
			<Board board={board} validMoves={validMoves} onClick={handleClick} />
			<div className="mt-4 text-lg">
				<p>Jogador atual: {currentPlayer === 1 ? 'Preto' : 'Branco'}</p>
				<p>
					Placar – Preto: {score.black} | Branco: {score.white}
				</p>
				{gameOver && <p className="mt-2 font-bold text-red-600">Game Over</p>}
			</div>
		</div>
	);
};

export default ReversiGame;
