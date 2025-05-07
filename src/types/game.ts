export enum Player {
	EMPTY = 'EMPTY',
	BLACK = 'BLACK',
	WHITE = 'WHITE',
}

export type BoardState = Player[][];

export interface GameScore {
	black: number;
	white: number;
}
