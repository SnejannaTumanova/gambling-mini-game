import { Bet } from '../data/Types';

export interface ResultStrategy {
	apply(balance: number, bet: Bet): number;
	getReward(bet: Bet): number;
}
