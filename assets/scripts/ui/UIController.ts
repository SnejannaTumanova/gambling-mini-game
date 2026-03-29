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
	AudioSource,
} from 'cc';
import { BetType } from '../data/Types';
import { GameConfig } from '../data/GameConfig';

const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {
	@property(Label) balanceLabel: Label = null!; // ! = Сейчас null, но в редакторе Cocos я обязательно подставлю ссылки.
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

	@property(AudioSource) winSound: AudioSource = null!;
	@property(AudioSource) loseSound: AudioSource = null!;
	@property(AudioSource) clickSound: AudioSource = null!;

	private currentBalance: number = 0;
	private currentBet: number = 0;
	private selectedColor: BetType | null = 'red';
	private isInteractionEnabled: boolean = true;

	start() {
		this.hideResult(); // сркываем мод окно результата
		this.playIdleAnimation(); // дыхвние кнопки PLAY

		this.overlayBlocker && (this.overlayBlocker.active = false); // выключаем оверлей

		this.updateSelectedColor(this.selectedColor); // выбранный цвет анимируется (по умолчанию красный)

		this.addHoverEffect(this.playButton);
		this.addHoverEffect(this.resetBetButton);
		this.addHoverEffect(this.add10Button);
		this.addHoverEffect(this.add50Button);
	}

	// =====================
	// DATA UPDATE
	// =====================

	updateBalance(value: number) {
		this.currentBalance = value;
		this.balanceLabel.string = value.toLocaleString(); // не 1000, а 1 000 - так красивее
	}

	updateBet(value: number) {
		this.currentBet = value;
		this.betLabel.string = value.toString(); //пропустила, надо было для общего UI - тоже toLocaleString()

		this.refreshBetControls(); //доступность кнопок повышения ставки
	}

	private refreshBetControls() {
		const available = this.currentBalance - this.currentBet;

		this.setButtonState(
			this.add10Button,
			available >= GameConfig.BET_STEP_SMALL,
		);

		this.setButtonState(this.add50Button, available >= GameConfig.BET_STEP_BIG);
	}

	// =====================
	// BALANCE
	// =====================

	animateBalance(
		from: number,
		to: number,
		duration: number = GameConfig.BALANCE_ANIMATION_DURATION,
	) {
		const obj = { value: from }; //промежуточный объект, потому что напрямую строку анимировать нельзя, где from - начальная стадия

		tween(obj)
			.to(
				duration,
				{ value: to }, // to - результат к которому мы должны прийти
				{
					onUpdate: () => {
						this.balanceLabel.string = Math.floor(obj.value).toLocaleString(); // каждый кадр рисуем промежуточное число
					},
				},
			)
			.start();
	}

	// =====================
	// RESULT
	// =====================

	showResult(isWin: boolean, amount: number) {
		this.resultRoot.active = true; //включаем popup результата.

		isWin ? this.winSound?.play() : this.loseSound?.play(); // нужный звук, ?. = если он есть

		this.animateResultBackground();

		if (isWin) {
			this.setWinState(amount);
		} else {
			this.setLoseState(amount);
		}

		this.playResultAnimation(isWin);
	}

	private playResultAnimation(isWin: boolean) {
		this.unscheduleAllCallbacks(); // удаляем старые отложенные вызовы
		Tween.stopAllByTarget(this.resultRoot); // останавливаем старые анимации popup

		this.resultRoot.setPosition(0, 0, 0);

		this.resultRoot.setScale(
			// начальный Scale popup, перед появлением
			new Vec3(
				GameConfig.RESULT_POPUP_START_SCALE,
				GameConfig.RESULT_POPUP_START_SCALE,
				1,
			),
		);

		let opacity = this.resultRoot.getComponent(UIOpacity); // получаем компонент прозрачности
		if (!opacity) {
			opacity = this.resultRoot.addComponent(UIOpacity); // если его нет - создаем
		}

		opacity.opacity = 0;

		// анимация появления текста ( 2 анимации scale animation + fade animation параллельно)
		tween(this.resultRoot)
			.to(GameConfig.RESULT_POPUP_BOUNCE_IN_1, {
				scale: new Vec3( //чуть больше, чем должен быть = как бы резиновое появление - motion
					GameConfig.RESULT_POPUP_MID_SCALE,
					GameConfig.RESULT_POPUP_MID_SCALE,
					1,
				),
			})
			.to(GameConfig.RESULT_POPUP_BOUNCE_IN_2, {
				scale: Vec3.ONE, // норма
			})
			.start();

		tween(opacity).to(GameConfig.FADE_DURATION, { opacity: 255 }).start(); // при этом текст плавно становится видимым

		// WIN
		if (isWin) {
			tween(this.resultAmountLabel.node)
				.repeatForever(
					// сумма выигрыша бесконечно пульсирует, а за время отвечает таймер в onSpinComplete внутри GameManager
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
		}

		// LOSE
		else {
			this.scheduleOnce(() => {
				// задержка, для анимации , чтобы пользователь успел прочитать инфо, можно было сделать через .delay
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
		//Полностью очищаем состояние popup результата.
		this.resultRoot.active = false;

		this.unscheduleAllCallbacks();

		this.resultRoot.setPosition(0, 0, 0);

		Tween.stopAllByTarget(this.resultAmountLabel.node);
		Tween.stopAllByTarget(this.resultLabel.node);
		Tween.stopAllByTarget(this.resultRoot);
		this.resultBackground && Tween.stopAllByTarget(this.resultBackground);
	}

	private animateResultBackground() {
		if (!this.resultBackground) return;

		this.resultBackground.active = true;

		const bgOpacity =
			this.resultBackground.getComponent(UIOpacity) ||
			this.resultBackground.addComponent(UIOpacity);

		bgOpacity.opacity = 0;

		tween(bgOpacity)
			.to(GameConfig.FADE_DURATION, { opacity: GameConfig.OVERLAY_OPACITY })
			.start();

		this.resultBackground.setScale(new Vec3(0.9, 0.9, 1));

		tween(this.resultBackground)
			.to(GameConfig.FADE_DURATION, { scale: new Vec3(1, 1, 1) })
			.start();
	}

	private setWinState(amount: number) {
		this.resultLabel.string = 'YOU WIN';
		this.resultAmountLabel.string = `+${amount}`;

		this.resultLabel.color = new Color(255, 215, 0); // золотой текст
		this.resultAmountLabel.color = new Color(255, 215, 0);

		this.spawnCoins(); // + монетки
	}

	private setLoseState(amount: number) {
		this.resultLabel.string = 'YOU LOSE';
		this.resultAmountLabel.string = `-${amount}`;

		this.resultLabel.color = new Color(30, 30, 30); // тёмно-серый цвет
		this.resultAmountLabel.color = new Color(30, 30, 30);
	}

	// =====================
	// COLOR SELECTION
	// =====================

	updateSelectedColor(color: BetType | null) {
		//отвечает за анимацию выбранной кнопки цвета
		this.selectedColor = color;

		this.animateColorButton(this.redButton.node, color === 'red');
		this.animateColorButton(this.blackButton.node, color === 'black');
	}

	private animateColorButton(node: Node, isActive: boolean) {
		Tween.stopAllByTarget(node); // останавливаем прежнюю анимацию

		node.setScale(Vec3.ONE); // возвращаем скейл в норму

		if (!isActive) return; // если эта кнопка не активна, то это всё, а если это выбранная кнопка, то назначаем ей новую анимацию

		node.setScale(new Vec3(1.2, 1.2, 1));

		tween(node)
			.repeatForever(
				tween()
					.to(0.6, { scale: new Vec3(1.3, 1.3, 1) })
					.to(0.6, { scale: new Vec3(1.2, 1.2, 1) }),
			)
			.start();
	}

	// =====================
	// INTERACTION
	// =====================

	setInteractionEnabled(enabled: boolean) {
		//выключаем кнопки + включаем overlay
		this.isInteractionEnabled = enabled;

		const buttons = [
			this.playButton,
			this.resetBetButton,
			this.add10Button,
			this.add50Button,
			this.redButton,
			this.blackButton,
		];

		buttons.forEach((btn) => this.setButtonState(btn, enabled)); // вкл/выкл все кнопки

		if (enabled) {
			this.refreshBetControls(); // корректировка по доступности кнопок увеличения ставки
		}

		this.updateSelectedColor(enabled ? this.selectedColor : null); // и снова активируем дыхание выбранного цвета, после разблок

		this.handleOverlay(enabled);
	}

	private handleOverlay(enabled: boolean) {
		if (!this.overlayBlocker) return;

		this.overlayBlocker.active = true;

		const opacity =
			this.overlayBlocker.getComponent(UIOpacity) ||
			this.overlayBlocker.addComponent(UIOpacity);

		if (!enabled) {
			// плавно появляется
			opacity.opacity = 0;

			tween(opacity)
				.to(GameConfig.FADE_DURATION, { opacity: GameConfig.OVERLAY_OPACITY })
				.start();
		} else {
			// плавно исчезает
			tween(opacity)
				.to(GameConfig.FADE_DURATION, { opacity: 0 })
				.call(() => {
					this.overlayBlocker.active = false;
					this.playIdleAnimation(); // снова включаем дыхание кнопки PLAY
				})
				.start();
		}
	}

	private setButtonState(button: Button | null, enabled: boolean) {
		if (!button) return; // защита от отсутствующей ссылки.

		const node = button.node;
		button.interactable = enabled; //логическое вкл/выкл кнопки

		const opacity =
			node.getComponent(UIOpacity) || node.addComponent(UIOpacity);

		Tween.stopAllByTarget(opacity); //стоп старую анимацию, если она ещё идёт

		tween(opacity)
			.to(GameConfig.FADE_DURATION, {
				opacity: enabled ? 255 : GameConfig.DISABLED_OPACITY, // прозрачность для enabled = 255, для не enabled = 140
			})
			.start();

		if (!enabled) node.setScale(Vec3.ONE); // в выкл состоянии все кнопки стандарного одинакового размера
	}

	// =====================
	// HOVER
	// =====================

	private addHoverEffect(button: Button) {
		const node = button.node;

		node.on(Node.EventType.MOUSE_ENTER, () => {
			if (!button.interactable) return; // если кнопка не активна, то никакой реакции

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

	// =====================
	// MISC
	// =====================

	private playIdleAnimation() {
		// дыхание кнопки PLAY
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
		// растягивание кнопки при клике
		const node = this.playButton.node;

		tween(node)
			.to(0.08, { scale: new Vec3(0.95, 0.95, 1) }) // кнопка сначла слегка вдавливается
			.to(0.08, { scale: new Vec3(1.05, 1.05, 1) }) // потом чуть подпрыгивает
			.to(0.08, { scale: Vec3.ONE }) // потом возвращается в норму
			.start();
	}

	private spawnCoins() {
		if (!this.coinsRoot || !this.coinPrefab) return; // только если есть префаб

		for (let i = 0; i < 8; i++) {
			// создаём 8 монеток для анимации получения выигрыша
			const coin = instantiate(this.coinPrefab); // клонируем 8 монгеток из префаба, можно при масштабировании использовать object pooling
			this.coinsRoot.addChild(coin); // добавляем на сцену

			const randomX = (Math.random() - 0.5) * 200; // случайная траектория разброса монеток по X оси
			const randomY = 150 + Math.random() * 100; // случайная траектория разброса монеток по Y оси

			tween(coin)
				.to(0.6, {
					position: new Vec3(randomX, randomY, 0), // монетка вылетает вверх/в сторону
					scale: Vec3.ONE,
				})
				.to(0.3, {
					position: new Vec3(randomX, randomY - 200, 0), // потом падает ниже
				})
				.call(() => coin.destroy()) //после окончания анимации удаляется
				.start();
		}
	}

	playClick() {
		this.clickSound?.stop(); // останавливаем текущий clickSound
		this.clickSound?.play(); // запускаем заново, чтобы короткий звук клика всегда начинался с начала и не наслаивался неаккуратно при частых нажатиях
	}
}
