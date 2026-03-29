import { _decorator, Component } from 'cc';
import { GameService } from '../services/GameService';
import { RandomService } from '../services/RandomService';
import { GameConfig } from '../data/GameConfig';
import { RoundOutcome, BetType } from '../data/Types';
import { GameFlowState } from './GameFlowState';
import { eventBus } from './EventBus';
import { GameEvents } from './GameEvents';
import { gameStore } from './GameStore';

const { ccclass } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
	private gameService = new GameService(new RandomService());

	start() {
		eventBus.on(GameEvents.PLAY_REQUESTED, this.onPlayRequested);
		eventBus.on(GameEvents.BET_CHANGE_REQUEST, this.onBetChangeRequested);
		eventBus.on(GameEvents.COLOR_CHANGE_REQUEST, this.onColorChangeRequested);
		eventBus.on(GameEvents.WHEEL_SPIN_COMPLETED, this.onWheelSpinCompleted);
	}

	onDestroy() {
		eventBus.off(GameEvents.PLAY_REQUESTED, this.onPlayRequested);
		eventBus.off(GameEvents.BET_CHANGE_REQUEST, this.onBetChangeRequested);
		eventBus.off(GameEvents.COLOR_CHANGE_REQUEST, this.onColorChangeRequested);
		eventBus.off(GameEvents.WHEEL_SPIN_COMPLETED, this.onWheelSpinCompleted);
	}

	private onBetChangeRequested = (delta: number) => {
		if (gameStore.getState() !== GameFlowState.IDLE) return;

		const currentBet = gameStore.getBet();
		const balance = gameStore.getBalance();
		const nextAmount = currentBet.amount + delta;

		if (nextAmount < GameConfig.RESET_BET) return;
		if (nextAmount > balance) return;

		gameStore.setBetAmount(nextAmount);
	};

	private onColorChangeRequested = (color: BetType) => {
		if (gameStore.getState() !== GameFlowState.IDLE) return;

		gameStore.setColor(color);
	};

	private onPlayRequested = (_payload: void) => {
		if (gameStore.getState() !== GameFlowState.IDLE) return;

		const balance = gameStore.getBalance();
		const bet = gameStore.getBet();

		if (!this.gameService.canPlay(balance, bet)) {
			console.log('Cannot play');
			return;
		}

		gameStore.setState(GameFlowState.SPINNING);

		const isWin = this.gameService.rollWin();
		const outcome = this.gameService.resolveRound(balance, bet, isWin);

		eventBus.emit(GameEvents.ROUND_STARTED, {
			outcome,
			prevBalance: balance,
		});
	};

	private onWheelSpinCompleted = ({
		outcome,
		prevBalance,
	}: {
		outcome: RoundOutcome;
		prevBalance: number;
	}) => {
		gameStore.setState(GameFlowState.SHOWING_RESULT);

		const previousBetAmount = gameStore.getBet().amount;

		gameStore.setBalance(outcome.nextBalance);

		if (gameStore.getBet().amount > gameStore.getBalance()) {
			gameStore.setBetAmount(GameConfig.RESET_BET);
		}

		eventBus.emit(GameEvents.RESULT_READY, {
			isWin: outcome.isWin,
			amount: outcome.isWin ? outcome.reward : previousBetAmount,
			prevBalance,
			newBalance: outcome.nextBalance,
		});

		this.scheduleOnce(() => {
			eventBus.emit(GameEvents.RESULT_HIDDEN, undefined);
			gameStore.setState(GameFlowState.IDLE);
		}, GameConfig.RESULT_SHOW_DURATION);
	};

	onAdd10() {
		eventBus.emit(GameEvents.BET_CHANGE_REQUEST, GameConfig.BET_STEP_SMALL);
	}

	onAdd50() {
		eventBus.emit(GameEvents.BET_CHANGE_REQUEST, GameConfig.BET_STEP_BIG);
	}

	onResetBet() {
		const currentAmount = gameStore.getBet().amount;
		eventBus.emit(GameEvents.BET_CHANGE_REQUEST, -currentAmount);
	}

	onSelectRed() {
		eventBus.emit(GameEvents.COLOR_CHANGE_REQUEST, 'red');
	}

	onSelectBlack() {
		eventBus.emit(GameEvents.COLOR_CHANGE_REQUEST, 'black');
	}

	onPlay() {
		eventBus.emit(GameEvents.PLAY_REQUESTED, undefined);
	}
}
