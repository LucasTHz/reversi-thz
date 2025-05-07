import React from 'react';
import Board from './Board';
import { useReversiGame } from '../hooks/useReversiGame';
import { Player } from '../types/game';

const ReversiGame: React.FC = () => {
	const { board, validMoves, currentPlayer, winner, score, handleMove } = useReversiGame();

	return (
		<div className="flex flex-col items-center p-4">
			<h1 className="text-3xl font-bold mb-4">Reversi</h1>
			<Board board={board} validMoves={validMoves} onClick={handleMove} />
			<div className="mt-4 text-lg">
				<p>Jogador atual: {currentPlayer === Player.BLACK ? 'Preto' : 'Branco'}</p>
				<p>
					Placar – Preto: {score.black} | Branco: {score.white}
				</p>
				{winner === 'Empate' ? (
					<p className="mt-2 font-bold text-yelow-600">Empate</p>
				) : (
					<p className="mt-2 font-bold text-green-600">O vencedor eh {winner}</p>
				)}
			</div>
		</div>
	);
};

export default ReversiGame;
