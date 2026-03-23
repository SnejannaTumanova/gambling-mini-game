export type BetType = 'red' | 'black';

export interface Bet {
	type: BetType;
	amount: number;
}

export interface RoundOutcome {
	isWin: boolean;
	reward: number; // сколько выиграли (или 0)
	nextBalance: number; // новый баланс
	resultType: BetType; // какой цвет выпал
}
