import { Bet, BetType, RoundOutcome } from '../data/Types';
import { RandomService } from './RandomService';
import { WinStrategy } from '../strategies/WinStrategy';
import { LoseStrategy } from '../strategies/LoseStrategy';
import { ResultStrategy } from '../strategies/ResultStrategy';
import { GameConfig } from '../data/GameConfig';

export class GameService {
	private randomService: RandomService;

	// можно было бы тоже передать в DI, но сейчас они фиксированы, поэтому пока так, а вот RandomService можно менять и тестировать без изменения логики тут
	private winStrategy = new WinStrategy();
	private loseStrategy = new LoseStrategy();

	constructor(randomService: RandomService) {
		this.randomService = randomService;
	}

	rollWin(chance: number = GameConfig.CHANCE): boolean {
		//передаём шанс, получаем true/false
		return this.randomService.rollWin(chance);
	}

	canPlay(balance: number, bet: Bet | null): boolean {
		// проверяем есть ли ставка и хватает ли денег
		if (!bet) return false;
		if (bet.amount <= 0) return false;
		if (bet.amount > balance) return false;

		return true;
	}

	resolveRound(balance: number, bet: Bet, isWin: boolean): RoundOutcome {
		// в зависимости от результата выбирается стратегия, которая определяет - как изменится баланс.
		const strategy: ResultStrategy = isWin
			? this.winStrategy
			: this.loseStrategy;

		const nextBalance = strategy.apply(balance, bet);
		const reward = strategy.getReward(bet);

		const resultType: BetType = isWin
			? bet.type
			: bet.type === 'red'
				? 'black'
				: 'red';

		return {
			isWin,
			reward,
			nextBalance,
			resultType,
		};
	}
}
