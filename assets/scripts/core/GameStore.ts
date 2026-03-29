import { GameFlowState } from './GameFlowState';
import { Bet, BetType } from '../data/Types';
import { GameConfig } from '../data/GameConfig';
import { eventBus } from './EventBus';
import { GameEvents } from './GameEvents';

class GameStore {
	private balance = GameConfig.START_BALANCE;

	private bet: Bet = {
		type: 'red',
		amount: GameConfig.DEFAULT_BET,
	};

	private state: GameFlowState = GameFlowState.IDLE;

	getBalance() {
		return this.balance;
	}

	getBet() {
		return this.bet;
	}

	getState() {
		return this.state;
	}

	setState(state: GameFlowState) {
		this.state = state;
		eventBus.emit(GameEvents.STATE_CHANGED, state);
	}

	setBalance(value: number) {
		this.balance = value;
		eventBus.emit(GameEvents.BALANCE_CHANGED, value);
	}

	setBetAmount(amount: number) {
		this.bet.amount = amount;
		eventBus.emit(GameEvents.BET_UPDATED, amount);
	}

	setColor(color: BetType) {
		this.bet.type = color;
		eventBus.emit(GameEvents.COLOR_UPDATED, color);
	}

	init() {
		eventBus.emit(GameEvents.BALANCE_CHANGED, this.balance);
		eventBus.emit(GameEvents.BET_UPDATED, this.bet.amount);
		eventBus.emit(GameEvents.COLOR_UPDATED, this.bet.type);
		eventBus.emit(GameEvents.STATE_CHANGED, this.state);
	}
}

export const gameStore = new GameStore();
