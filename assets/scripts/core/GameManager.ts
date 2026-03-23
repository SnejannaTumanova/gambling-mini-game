import { _decorator, Component } from 'cc';
import { WheelController } from '../game/WheelController';
import { UIController } from '../ui/UIController';
import { Bet, BetType, RoundOutcome } from '../data/Types';
import { GameService } from '../services/GameService';
import { RandomService } from '../services/RandomService';
import { GameFlowState } from './GameFlowState';
import { GameConfig } from '../data/GameConfig';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
	@property(WheelController)
	wheelController: WheelController = null!;

	@property(UIController)
	uiController: UIController = null!;

	private balance: number = GameConfig.START_BALANCE;

	private currentBet: Bet = {
		type: 'red',
		amount: GameConfig.DEFAULT_BET,
	};

	private flowState: GameFlowState = GameFlowState.IDLE;

	private gameService = new GameService(new RandomService());

	start() {
		this.uiController.setInteractionEnabled(false);
		this.syncUI();

		this.uiController.hideResult();
		this.uiController.setInteractionEnabled(true);
	}

	//  SYNC UI

	private syncUI() {
		this.uiController.updateBalance(this.balance);
		this.uiController.updateBet(this.currentBet.amount);
		this.uiController.updateSelectedColor(this.currentBet.type);
	}

	//  BET ACTIONS

	increaseBet(amount: number) {
		if (this.flowState !== GameFlowState.IDLE) return;

		const available = this.balance - this.currentBet.amount;

		if (available < amount) return;

		this.currentBet.amount += amount;

		this.syncUI();
	}

	resetBet() {
		if (this.flowState !== GameFlowState.IDLE) return;

		this.currentBet.amount = GameConfig.RESET_BET;

		this.syncUI();
	}

	selectColor(color: BetType) {
		if (this.flowState !== GameFlowState.IDLE) return;

		this.currentBet.type = color;

		this.uiController.updateSelectedColor(color);
	}

	// GAME FLOW

	play() {
		if (this.flowState !== GameFlowState.IDLE) return;

		if (!this.gameService.canPlay(this.balance, this.currentBet)) {
			console.log('Cannot play');
			return;
		}

		this.uiController.playButtonClickAnimation();
		this.uiController.playClick();

		this.flowState = GameFlowState.SPINNING;

		this.uiController.hideResult();
		this.uiController.setInteractionEnabled(false);

		const isWin = this.gameService.rollWin();

		const resultType: BetType = isWin
			? this.currentBet.type
			: this.getOppositeColor(this.currentBet.type);

		const prevBalance = this.balance;

		this.wheelController.spinTo(resultType, () => {
			const outcome = this.gameService.resolveRound(
				this.balance,
				this.currentBet,
				isWin,
			);

			this.balance = outcome.nextBalance;

			this.onSpinComplete(outcome, prevBalance);
		});
	}

	private onSpinComplete(outcome: RoundOutcome, prevBalance: number) {
		this.flowState = GameFlowState.SHOWING_RESULT;

		//  сохраняем старую ставку
		const previousBetAmount = this.currentBet.amount;

		this.balance = outcome.nextBalance;

		// ФИКС СТАВКИ
		if (this.currentBet.amount > this.balance) {
			this.currentBet.amount = GameConfig.RESET_BET;
		}

		if (outcome.isWin) {
			this.uiController.animateBalance(
				prevBalance,
				this.balance,
				GameConfig.BALANCE_ANIMATION_DURATION,
			);
		} else {
			this.uiController.updateBalance(this.balance);
		}

		// используем старую ставку
		const displayAmount = outcome.isWin ? outcome.reward : previousBetAmount;

		this.uiController.showResult(outcome.isWin, displayAmount);

		this.scheduleOnce(() => {
			this.uiController.hideResult();

			this.flowState = GameFlowState.IDLE;
			this.uiController.setInteractionEnabled(true);

			this.syncUI();
		}, GameConfig.RESULT_SHOW_DURATION);
	}

	private getOppositeColor(color: BetType): BetType {
		return color === 'red' ? 'black' : 'red';
	}

	//  UI BUTTONS

	onAdd10() {
		this.uiController.playClick();
		this.increaseBet(GameConfig.BET_STEP_SMALL);
	}

	onAdd50() {
		this.uiController.playClick();
		this.increaseBet(GameConfig.BET_STEP_BIG);
	}

	onSelectRed() {
		this.uiController.playClick();
		this.selectColor('red');
	}

	onSelectBlack() {
		this.uiController.playClick();
		this.selectColor('black');
	}

	onResetBet() {
		this.uiController.playClick();
		this.resetBet();
	}
}
