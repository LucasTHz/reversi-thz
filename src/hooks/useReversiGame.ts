import { useState, useCallback } from 'react';
import { getValidMoves, makeMove, calculateScore } from '../utils/gameLogic';
import { Player, BoardState } from '../types/game';

export const useReversiGame = () => {
	const [board, setBoard] = useState<BoardState>(
		Array(8)
			.fill(null)
			.map(() => Array(8).fill(Player.EMPTY))
	);
	const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.BLACK);
	const [winner, setWinner] = useState<string>('');

	const initializeBoard = useCallback(() => {
		const newBoard = Array(8)
			.fill(null)
			.map(() => Array(8).fill(Player.EMPTY));
		newBoard[3][3] = newBoard[4][4] = Player.WHITE;
		newBoard[3][4] = newBoard[4][3] = Player.BLACK;
		setBoard(newBoard);
	}, []);

	useState(initializeBoard);

	const validMoves = getValidMoves(board, currentPlayer);
	const score = calculateScore(board);

	const handleMove = useCallback(
		(row: number, col: number) => {
			if (winner || !validMoves.some((move) => move[0] === row && move[1] === col)) {
				return;
			}

			const newBoard = makeMove(board, row, col, currentPlayer);
			setBoard(newBoard);

			const nextPlayer = currentPlayer === Player.BLACK ? Player.WHITE : Player.BLACK;
			const hasValidMoves = getValidMoves(newBoard, nextPlayer).length > 0;

			if (hasValidMoves) {
				setCurrentPlayer(nextPlayer);
			} else if (!getValidMoves(newBoard, currentPlayer).length) {
				setWinner(score.black > score.white ? 'Preto' : score.white > score.black ? 'Branco' : 'Empate');
			}
		},
		[board, currentPlayer, winner, validMoves]
	);

	return {
		board,
		validMoves,
		currentPlayer,
		winner,
		score,
		handleMove,
	};
};
