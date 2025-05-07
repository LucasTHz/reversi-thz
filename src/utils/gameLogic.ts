import { Player, BoardState, GameScore } from '../types/game';

const DIRECTIONS = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
];

export const getValidMoves = (board: BoardState, player: Player): number[][] => {
	const moves: number[][] = [];

	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			if (board[row][col] === Player.EMPTY && isValidMove(board, row, col, player)) {
				moves.push([row, col]);
			}
		}
	}

	return moves;
};

const isValidMove = (board: BoardState, row: number, col: number, player: Player): boolean => {
	return DIRECTIONS.some(([dx, dy]) => checkDirection(board, row, col, dx, dy, player));
};

const checkDirection = (
	board: BoardState,
	row: number,
	col: number,
	dx: number,
	dy: number,
	player: Player
): boolean => {
	let x = row + dx;
	let y = col + dy;
	let foundOpponent = false;

	while (x >= 0 && x < 8 && y >= 0 && y < 8) {
		if (board[x][y] === Player.EMPTY) return false;
		if (board[x][y] === player) return foundOpponent;
		foundOpponent = true;
		x += dx;
		y += dy;
	}

	return false;
};

export const makeMove = (board: BoardState, row: number, col: number, player: Player): BoardState => {
	const newBoard = board.map((row) => [...row]);
	newBoard[row][col] = player;

	DIRECTIONS.forEach(([dx, dy]) => {
		if (checkDirection(board, row, col, dx, dy, player)) {
			flipPieces(newBoard, row, col, dx, dy, player);
		}
	});

	return newBoard;
};

const flipPieces = (board: BoardState, row: number, col: number, dx: number, dy: number, player: Player): void => {
	let x = row + dx;
	let y = col + dy;

	while (board[x][y] !== player) {
		board[x][y] = player;
		x += dx;
		y += dy;
	}
};

export const calculateScore = (board: BoardState): GameScore => {
	const score = board.flat().reduce(
		(acc, cell) => ({
			black: acc.black + (cell === Player.BLACK ? 1 : 0),
			white: acc.white + (cell === Player.WHITE ? 1 : 0),
		}),
		{ black: 0, white: 0 }
	);

	return score;
};
