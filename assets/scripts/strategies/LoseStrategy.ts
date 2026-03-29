import { Bet } from '../data/Types';
import { ResultStrategy } from './ResultStrategy';

export class LoseStrategy implements ResultStrategy {
	// баланс минус ставка
	apply(balance: number, bet: Bet): number {
		return balance - bet.amount;
	}

	// ничего не выиграли
	getReward(_bet: Bet): number {
		return 0;
	}
}

// Стратегия проигрыша уменьшает баланс и возвращает нулевой reward.
