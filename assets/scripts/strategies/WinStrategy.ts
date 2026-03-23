import { Bet } from '../data/Types';
import { ResultStrategy } from './ResultStrategy';

export class WinStrategy implements ResultStrategy {
	apply(balance: number, bet: Bet): number {
		return balance + bet.amount * 2;
	}

	getReward(bet: Bet): number {
		return bet.amount * 2;
	}
}
