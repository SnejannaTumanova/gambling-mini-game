import { Bet } from '../data/Types';
import { ResultStrategy } from './ResultStrategy';

export class LoseStrategy implements ResultStrategy {
	apply(balance: number, bet: Bet): number {
		return balance - bet.amount;
	}

	getReward(_bet: Bet): number {
		return 0;
	}
}
