import {
	_decorator,
	Component,
	Label,
	Node,
	tween,
	Button,
	Vec3,
	UIOpacity,
	Tween,
	Color,
	instantiate,
	Prefab,
} from 'cc';
import { BetType } from '../data/Types';
import { GameConfig } from '../data/GameConfig';
import { eventBus } from '../core/EventBus';
import { GameEvents } from '../core/GameEvents';
import { GameFlowState } from '../core/GameFlowState';
import { gameStore } from '../core/GameStore';
import { audioService } from '../services/AudioService';

const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {
	@property(Label) balanceLabel: Label = null!;
	@property(Label) betLabel: Label = null!;

	@property(Node) resultRoot: Node = null!;
	@property(Node) resultBackground: Node = null!;
	@property(Label) resultLabel: Label = null!;
	@property(Label) resultAmountLabel: Label = null!;

	@property(Button) playButton: Button = null!;
	@property(Button) resetBetButton: Button = null!;
	@property(Button) add10Button: Button = null!;
	@property(Button) add50Button: Button = null!;
	@property(Button) redButton: Button = null!;
	@property(Button) blackButton: Button = null!;

	@property(Node) overlayBlocker: Node = null!;

	@property(Node) coinsRoot: Node = null!;
	@property(Prefab) coinPrefab: Prefab = null!;

	@property(Node) soundOnIcon: Node = null!;
	@property(Node) soundOffIcon: Node = null!;

	@property(Node) settingsPanel: Node = null!;

	private currentBalance = 0;
	private currentBet = 0;
	private selectedColor: BetType | null = 'red';
	private isInteractionEnabled = true;

	start() {
		eventBus.on(GameEvents.BALANCE_CHANGED, this.updateBalance);
		eventBus.on(GameEvents.BET_UPDATED, this.updateBet);
		eventBus.on(GameEvents.COLOR_UPDATED, this.updateSelectedColor);
		eventBus.on(GameEvents.RESULT_READY, this.onResultReady);
		eventBus.on(GameEvents.RESULT_HIDDEN, this.onResultHidden);
		eventBus.on(GameEvents.STATE_CHANGED, this.onStateChanged);

		this.hideResult();
		this.playIdleAnimation();

		if (this.overlayBlocker) {
			this.overlayBlocker.active = false;
		}

		this.updateBalance(gameStore.getBalance());
		this.updateBet(gameStore.getBet().amount);
		this.updateSelectedColor(gameStore.getBet().type);

		eventBus.on(GameEvents.SOUND_TOGGLE, this.updateSoundUI);
		eventBus.on(GameEvents.SETTINGS_TOGGLE, this.toggleSettingsPanel);

		this.updateSoundUI();
	}

	onDestroy() {
		eventBus.off(GameEvents.BALANCE_CHANGED, this.updateBalance);
		eventBus.off(GameEvents.BET_UPDATED, this.updateBet);
		eventBus.off(GameEvents.COLOR_UPDATED, this.updateSelectedColor);
		eventBus.off(GameEvents.RESULT_READY, this.onResultReady);
		eventBus.off(GameEvents.RESULT_HIDDEN, this.onResultHidden);
		eventBus.off(GameEvents.STATE_CHANGED, this.onStateChanged);
		eventBus.off(GameEvents.SOUND_TOGGLE, this.updateSoundUI);
		eventBus.off(GameEvents.SETTINGS_TOGGLE, this.toggleSettingsPanel);
	}

	private onResultReady = ({
		isWin,
		amount,
		prevBalance,
		newBalance,
	}: {
		isWin: boolean;
		amount: number;
		prevBalance: number;
		newBalance: number;
	}) => {
		if (isWin) {
			this.animateBalance(prevBalance, newBalance);
		} else {
			this.updateBalance(newBalance);
		}

		this.showResult(isWin, amount);
	};

	private onResultHidden = (_payload: void) => {
		this.hideResult();
	};

	private onStateChanged = (state: GameFlowState) => {
		const isIdle = state === GameFlowState.IDLE;

		this.setInteractionEnabled(isIdle);

		if (state === GameFlowState.SPINNING) {
			this.hideResult();
		}
	};

	updateBalance = (value: number) => {
		this.currentBalance = value;
		this.balanceLabel.string = value.toLocaleString();
	};

	updateBet = (value: number) => {
		this.currentBet = value;
		this.betLabel.string = value.toString();
		this.refreshBetControls();
	};

	updateSelectedColor = (color: BetType) => {
		this.selectedColor = color;

		this.animateColorButton(this.redButton.node, color === 'red');
		this.animateColorButton(this.blackButton.node, color === 'black');
	};

	private refreshBetControls() {
		const available = this.currentBalance - this.currentBet;

		this.setButtonState(
			this.add10Button,
			available >= GameConfig.BET_STEP_SMALL,
		);

		this.setButtonState(this.add50Button, available >= GameConfig.BET_STEP_BIG);
	}

	animateBalance(
		from: number,
		to: number,
		duration: number = GameConfig.BALANCE_ANIMATION_DURATION,
	) {
		const obj = { value: from };

		tween(obj)
			.to(
				duration,
				{ value: to },
				{
					onUpdate: () => {
						this.balanceLabel.string = Math.floor(obj.value).toLocaleString();
					},
				},
			)
			.start();
	}

	showResult(isWin: boolean, amount: number) {
		this.resultRoot.active = true;

		this.animateResultBackground();

		if (isWin) {
			this.setWinState(amount);
		} else {
			this.setLoseState(amount);
		}

		this.playResultAnimation(isWin);
	}

	private playResultAnimation(isWin: boolean) {
		this.unscheduleAllCallbacks();
		Tween.stopAllByTarget(this.resultRoot);

		this.resultRoot.setPosition(0, 0, 0);
		this.resultRoot.setScale(
			new Vec3(
				GameConfig.RESULT_POPUP_START_SCALE,
				GameConfig.RESULT_POPUP_START_SCALE,
				1,
			),
		);

		let opacity = this.resultRoot.getComponent(UIOpacity);
		if (!opacity) {
			opacity = this.resultRoot.addComponent(UIOpacity);
		}

		opacity.opacity = 0;

		tween(this.resultRoot)
			.to(GameConfig.RESULT_POPUP_BOUNCE_IN_1, {
				scale: new Vec3(
					GameConfig.RESULT_POPUP_MID_SCALE,
					GameConfig.RESULT_POPUP_MID_SCALE,
					1,
				),
			})
			.to(GameConfig.RESULT_POPUP_BOUNCE_IN_2, {
				scale: Vec3.ONE,
			})
			.start();

		tween(opacity).to(GameConfig.FADE_DURATION, { opacity: 255 }).start();

		if (isWin) {
			tween(this.resultAmountLabel.node)
				.repeatForever(
					tween()
						.to(GameConfig.WIN_AMOUNT_PULSE_DURATION, {
							scale: new Vec3(
								GameConfig.WIN_AMOUNT_SCALE,
								GameConfig.WIN_AMOUNT_SCALE,
								1,
							),
						})
						.to(GameConfig.WIN_AMOUNT_PULSE_DURATION, {
							scale: Vec3.ONE,
						}),
				)
				.start();
		} else {
			this.scheduleOnce(() => {
				tween(this.resultRoot)
					.to(GameConfig.LOSE_DROP_DURATION, {
						position: new Vec3(0, GameConfig.LOSE_DROP_Y, 0),
						scale: new Vec3(
							GameConfig.LOSE_DROP_SCALE,
							GameConfig.LOSE_DROP_SCALE,
							1,
						),
					})
					.start();

				tween(opacity)
					.to(GameConfig.LOSE_DROP_DURATION, { opacity: 0 })
					.start();
			}, GameConfig.LOSE_DROP_DELAY);
		}
	}

	hideResult() {
		this.resultRoot.active = false;

		this.unscheduleAllCallbacks();
		this.resultRoot.setPosition(0, 0, 0);

		Tween.stopAllByTarget(this.resultAmountLabel.node);
		Tween.stopAllByTarget(this.resultLabel.node);
		Tween.stopAllByTarget(this.resultRoot);
		if (this.resultBackground) {
			Tween.stopAllByTarget(this.resultBackground);
		}
	}

	private animateResultBackground() {
		if (!this.resultBackground) return;

		this.resultBackground.active = true;

		const bgOpacity =
			this.resultBackground.getComponent(UIOpacity) ||
			this.resultBackground.addComponent(UIOpacity);

		bgOpacity.opacity = 0;

		tween(bgOpacity)
			.to(GameConfig.FADE_DURATION, {
				opacity: GameConfig.OVERLAY_OPACITY,
			})
			.start();

		this.resultBackground.setScale(new Vec3(0.9, 0.9, 1));

		tween(this.resultBackground)
			.to(GameConfig.FADE_DURATION, { scale: new Vec3(1, 1, 1) })
			.start();
	}

	private setWinState(amount: number) {
		this.resultLabel.string = 'YOU WIN';
		this.resultAmountLabel.string = `+${amount}`;

		this.resultLabel.color = new Color(255, 215, 0);
		this.resultAmountLabel.color = new Color(255, 215, 0);

		this.spawnCoins();
	}

	private setLoseState(amount: number) {
		this.resultLabel.string = 'YOU LOSE';
		this.resultAmountLabel.string = `-${amount}`;

		this.resultLabel.color = new Color(30, 30, 30);
		this.resultAmountLabel.color = new Color(30, 30, 30);
	}

	private animateColorButton(node: Node, isActive: boolean) {
		Tween.stopAllByTarget(node);

		node.setScale(Vec3.ONE);

		if (!isActive) return;

		node.setScale(new Vec3(1.2, 1.2, 1));

		tween(node)
			.repeatForever(
				tween()
					.to(0.6, { scale: new Vec3(1.3, 1.3, 1) })
					.to(0.6, { scale: new Vec3(1.2, 1.2, 1) }),
			)
			.start();
	}

	setInteractionEnabled(enabled: boolean) {
		this.isInteractionEnabled = enabled;

		const buttons = [
			this.playButton,
			this.resetBetButton,
			this.add10Button,
			this.add50Button,
			this.redButton,
			this.blackButton,
		];

		buttons.forEach((btn) => this.setButtonState(btn, enabled));

		if (enabled) {
			this.refreshBetControls();
		}

		this.handleOverlay(enabled);
	}

	private handleOverlay(enabled: boolean) {
		if (!this.overlayBlocker) return;

		this.overlayBlocker.active = true;

		const opacity =
			this.overlayBlocker.getComponent(UIOpacity) ||
			this.overlayBlocker.addComponent(UIOpacity);

		if (!enabled) {
			opacity.opacity = 0;

			tween(opacity)
				.to(GameConfig.FADE_DURATION, {
					opacity: GameConfig.OVERLAY_OPACITY,
				})
				.start();
		} else {
			tween(opacity)
				.to(GameConfig.FADE_DURATION, { opacity: 0 })
				.call(() => {
					this.overlayBlocker.active = false;
					this.playIdleAnimation();
				})
				.start();
		}
	}

	private setButtonState(button: Button | null, enabled: boolean) {
		if (!button) return;

		const node = button.node;
		button.interactable = enabled;

		const opacity =
			node.getComponent(UIOpacity) || node.addComponent(UIOpacity);

		Tween.stopAllByTarget(opacity);

		tween(opacity)
			.to(GameConfig.FADE_DURATION, {
				opacity: enabled ? 255 : GameConfig.DISABLED_OPACITY,
			})
			.start();

		if (!enabled) {
			node.setScale(Vec3.ONE);
		}
	}

	private addHoverEffect(button: Button) {
		const node = button.node;

		node.on(Node.EventType.MOUSE_ENTER, () => {
			if (!button.interactable) return;

			Tween.stopAllByTarget(node);

			tween(node)
				.to(0.1, { scale: new Vec3(1.07, 1.07, 1) })
				.start();
		});

		node.on(Node.EventType.MOUSE_LEAVE, () => {
			Tween.stopAllByTarget(node);
			tween(node).to(0.1, { scale: Vec3.ONE }).start();
		});
	}

	private playIdleAnimation() {
		const node = this.playButton.node;

		Tween.stopAllByTarget(node);

		tween(node)
			.repeatForever(
				tween()
					.to(0.8, { scale: new Vec3(1.05, 1.05, 1) })
					.to(0.8, { scale: Vec3.ONE }),
			)
			.start();
	}

	playButtonClickAnimation() {
		const node = this.playButton.node;

		tween(node)
			.to(0.08, { scale: new Vec3(0.95, 0.95, 1) })
			.to(0.08, { scale: new Vec3(1.05, 1.05, 1) })
			.to(0.08, { scale: Vec3.ONE })
			.start();
	}

	private spawnCoins() {
		if (!this.coinsRoot || !this.coinPrefab) return;

		for (let i = 0; i < 8; i++) {
			const coin = instantiate(this.coinPrefab);
			this.coinsRoot.addChild(coin);

			const randomX = (Math.random() - 0.5) * 200;
			const randomY = 150 + Math.random() * 100;

			tween(coin)
				.to(0.6, {
					position: new Vec3(randomX, randomY, 0),
					scale: Vec3.ONE,
				})
				.to(0.3, {
					position: new Vec3(randomX, randomY - 200, 0),
				})
				.call(() => coin.destroy())
				.start();
		}
	}

	onToggleSound() {
		eventBus.emit(GameEvents.SOUND_TOGGLE, undefined);
	}

	onVolumeChanged(slider: any) {
		const value = slider.progress * 2;
		eventBus.emit(GameEvents.VOLUME_CHANGED, value);
	}

	openSettings() {
		eventBus.emit(GameEvents.SETTINGS_TOGGLE, undefined);
	}

	closeSettings() {
		eventBus.emit(GameEvents.SETTINGS_TOGGLE, undefined);
	}

	private updateSoundUI = () => {
		const isMuted = audioService.isMuted();

		this.soundOnIcon.active = !isMuted;
		this.soundOffIcon.active = isMuted;
	};

	private toggleSettingsPanel = () => {
		this.settingsPanel.active = !this.settingsPanel.active;
	};
}
