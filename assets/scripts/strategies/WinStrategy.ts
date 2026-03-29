import { Bet } from '../data/Types';
import { ResultStrategy } from './ResultStrategy';

export class WinStrategy implements ResultStrategy {
	// баланс + выигрыш x2
	apply(balance: number, bet: Bet): number {
		return balance + bet.amount * 2;
	}

	// сумма выигрыша
	getReward(bet: Bet): number {
		return bet.amount * 2;
	}
}

// Стратегия выигрыша увеличивает баланс и возвращает выигрыш.
