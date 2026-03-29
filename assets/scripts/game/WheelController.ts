import {
	_decorator,
	Component,
	Node,
	ParticleSystem2D,
	tween,
	Tween,
	UIOpacity,
	Vec3,
} from 'cc';
import { BetType } from '../data/Types';
import { GameConfig } from '../data/GameConfig';
import { eventBus } from '../core/EventBus';
import { GameEvents } from '../core/GameEvents';

const { ccclass, property } = _decorator;

@ccclass('WheelController')
export class WheelController extends Component {
	@property(Node)
	wheel: Node = null!; // колесо

	@property(Node)
	pointer: Node = null!; // стрелочка

	@property(Node)
	wheelGlow: Node = null!; // фон

	@property(ParticleSystem2D)
	wheelParticles: ParticleSystem2D = null!; // я пыталась добавить частицы, но не получилось, а блок кода остался

	private isSpinning: boolean = false; // guard - защита от повторного запуска
	private currentOutcome: any;
	private prevBalance: number = 0;

	private readonly sectors: BetType[] = [
		'red',
		'black',
		'red',
		'black',
		'red',
		'black',
		'red',
		'black',
	]; // логическая модель колеса (порядок секторов)

	start() {
		if (this.wheelGlow) {
			this.wheelGlow.active = true; // включаем фон

			const opacity =
				this.wheelGlow.getComponent(UIOpacity) ||
				this.wheelGlow.addComponent(UIOpacity);

			opacity.opacity = 80; // при старте прозрачность 80, чтобы при запуске концентрировать внимание на яркости
		}
		eventBus.on(GameEvents.ROUND_STARTED, this.onRoundStarted);
	}

	private onRoundStarted = ({ outcome, prevBalance }: any) => {
		this.currentOutcome = outcome;
		this.prevBalance = prevBalance;

		this.spinTo(outcome.resultType);
	};

	spinTo(resultType: BetType) {
		if (this.isSpinning) return;

		this.isSpinning = true;

		this.startGlow();

		const rotation = this.calculateRotationForType(resultType);

		this.wheel.setRotationFromEuler(0, 0, 0);
		Tween.stopAllByTarget(this.wheel);

		tween(this.wheel)
			.to(
				2.5,
				{ eulerAngles: new Vec3(0, 0, rotation) },
				{ easing: 'cubicOut' },
			)
			.call(() => {
				this.playPointerBounce();

				// 👉 ВАЖНО: остановить glow
				this.stopGlow();

				this.isSpinning = false;

				eventBus.emit(GameEvents.WHEEL_SPIN_COMPLETED, {
					outcome: this.currentOutcome,
					prevBalance: this.prevBalance,
				});
			})
			.start();
	}

	private calculateRotationForType(resultType: BetType): number {
		const baseSpins = GameConfig.WHEEL_SPINS * 360; // обязательно делаем несколько полных оборотов

		const sectorSize = 360 / this.sectors.length; // 45 - размер одного сектора
		const halfSector = sectorSize / 2; // 22.5 - соответственно середина сектора

		const availableIndexes: number[] = [];

		for (let i = 0; i < this.sectors.length; i++) {
			if (this.sectors[i] === resultType) {
				availableIndexes.push(i); // поиск подходящих индексов по цвету
			}
		}

		const randomIndex =
			availableIndexes[Math.floor(Math.random() * availableIndexes.length)]; // выбираем случайный из списка подходящих, лучше было бы использовать RandomService

		const pointerAngle = 90; // угол нахождения стрелки

		const finalAngle = pointerAngle - (randomIndex * sectorSize + halfSector); // финальный угол на который нужно повернуть колесо, чтобы сектор оказался под стрелкой

		console.log('TARGET TYPE:', resultType, 'SECTOR INDEX:', randomIndex); // мой рабочий лог, можно убрать, я просто тестировала с ним

		return baseSpins + finalAngle; // несколько вращений + нужный угол
	}

	private playPointerBounce() {
		// микро-анимация стрелки
		if (!this.pointer) return;

		Tween.stopAllByTarget(this.pointer);
		this.pointer.setScale(new Vec3(1, 1, 1));

		tween(this.pointer)
			.to(0.08, { scale: new Vec3(1.15, 1.15, 1) })
			.to(0.08, { scale: new Vec3(0.95, 0.95, 1) })
			.to(0.08, { scale: new Vec3(1, 1, 1) })
			.start();
	}

	private startGlow() {
		if (!this.wheelGlow) return;

		if (this.wheelParticles) {
			this.wheelParticles.resetSystem(); // хотела частицы, но не увидела их
		}

		const opacity =
			this.wheelGlow.getComponent(UIOpacity) ||
			this.wheelGlow.addComponent(UIOpacity);

		tween(opacity).to(0.2, { opacity: 180 }).start(); // более яркий фон

		tween(this.wheelGlow)
			.repeatForever(
				tween() // пульсация фона
					.to(0.4, { scale: new Vec3(1.2, 1.2, 1) })
					.to(0.4, { scale: new Vec3(1.1, 1.1, 1) }),
			)
			.start();
	}

	private stopGlow() {
		if (!this.wheelGlow) return;

		if (this.wheelParticles) {
			this.wheelParticles.stopSystem(); // выключаем частицы, которые итак не видно :(
		}

		Tween.stopAllByTarget(this.wheelGlow); // стоп на анимацию

		const opacity =
			this.wheelGlow.getComponent(UIOpacity) ||
			this.wheelGlow.addComponent(UIOpacity);

		tween(opacity).to(0.2, { opacity: 80 }).start(); // возвращаем стартовую норму

		tween(this.wheelGlow)
			.to(0.2, { scale: new Vec3(1.1, 1.1, 1) })
			.start();
	}
}

// import {
// 	_decorator,
// 	Component,
// 	Node,
// 	Sprite,
// 	Material,
// 	tween,
// 	Tween,
// 	Vec3,
// 	Texture2D,
// } from 'cc';
// import { BetType } from '../data/Types';
// import { GameConfig } from '../data/GameConfig';

// const { ccclass, property } = _decorator;

// @ccclass('WheelController')
// export class WheelController extends Component {
// 	@property(Node)
// 	wheel: Node = null!;

// 	@property(Node)
// 	pointer: Node = null!;

// 	@property(Node)
// 	wheelGlow: Node = null!;

// 	private isSpinning = false;
// 	private glowMaterial: Material | null = null;
// 	private shaderTime = 0;

// 	private readonly sectors: BetType[] = [
// 		'red',
// 		'black',
// 		'red',
// 		'black',
// 		'red',
// 		'black',
// 		'red',
// 		'black',
// 	];

// 	start() {
// 		this.initGlowMaterial();
// 	}

// 	update(dt: number) {
// 		if (!this.glowMaterial) return;

// 		this.shaderTime += dt;
// 		this.glowMaterial.setProperty('time', this.shaderTime);
// 	}

// 	spinTo(resultType: BetType, onComplete: () => void) {
// 		if (this.isSpinning) return;

// 		this.isSpinning = true;
// 		this.startGlow();

// 		const rotation = this.calculateRotationForType(resultType);

// 		this.wheel.setRotationFromEuler(0, 0, 0);
// 		this.wheel.setScale(new Vec3(1, 1, 1));

// 		Tween.stopAllByTarget(this.wheel);

// 		tween(this.wheel)
// 			.to(
// 				GameConfig.SPIN_DURATION,
// 				{ eulerAngles: new Vec3(0, 0, rotation) },
// 				{ easing: 'cubicOut' },
// 			)
// 			.call(() => {
// 				this.playPointerBounce();
// 				this.stopGlow();

// 				tween(this.wheel)
// 					.to(0.05, { scale: new Vec3(1.03, 1.03, 1) })
// 					.to(0.05, { scale: new Vec3(1, 1, 1) })
// 					.call(() => {
// 						this.isSpinning = false;
// 						onComplete();
// 					})
// 					.start();
// 			})
// 			.start();
// 	}

// 	private initGlowMaterial() {
// 		if (!this.wheelGlow) {
// 			console.warn('[WheelController] wheelGlow node is missing.');
// 			return;
// 		}

// 		const glowSprite = this.wheelGlow.getComponent(Sprite);
// 		if (!glowSprite) {
// 			console.warn('[WheelController] WheelGlow node has no Sprite component.');
// 			return;
// 		}

// 		this.glowMaterial = glowSprite.getMaterialInstance(0);
// 		if (!this.glowMaterial) {
// 			console.warn(
// 				'[WheelController] Failed to get material instance from WheelGlow sprite.',
// 			);
// 			return;
// 		}

// 		const spriteFrame = glowSprite.spriteFrame;
// 		const texture = spriteFrame?.texture as Texture2D | null;

// 		if (!spriteFrame || !texture) {
// 			console.warn(
// 				'[WheelController] WheelGlow spriteFrame or texture is missing.',
// 			);
// 			return;
// 		}

// 		this.glowMaterial.setProperty('mainTexture', texture);

// 		this.wheelGlow.active = true;
// 		this.wheelGlow.setScale(new Vec3(1, 1, 1));

// 		this.applyGlowIdleState();
// 	}

// 	private calculateRotationForType(resultType: BetType): number {
// 		const baseSpins = GameConfig.WHEEL_SPINS * 360;
// 		const sectorSize = 360 / this.sectors.length;
// 		const halfSector = sectorSize / 2;

// 		const availableIndexes: number[] = [];

// 		for (let i = 0; i < this.sectors.length; i++) {
// 			if (this.sectors[i] === resultType) {
// 				availableIndexes.push(i);
// 			}
// 		}

// 		const randomIndex =
// 			availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

// 		const pointerAngle = 90;
// 		const finalAngle = pointerAngle - (randomIndex * sectorSize + halfSector);

// 		console.log(
// 			'[WheelController] TARGET TYPE:',
// 			resultType,
// 			'SECTOR INDEX:',
// 			randomIndex,
// 		);

// 		return baseSpins + finalAngle;
// 	}

// 	private playPointerBounce() {
// 		if (!this.pointer) return;

// 		Tween.stopAllByTarget(this.pointer);
// 		this.pointer.setScale(new Vec3(1, 1, 1));

// 		tween(this.pointer)
// 			.to(0.08, { scale: new Vec3(1.15, 1.15, 1) })
// 			.to(0.08, { scale: new Vec3(0.95, 0.95, 1) })
// 			.to(0.08, { scale: new Vec3(1, 1, 1) })
// 			.start();
// 	}

// 	private startGlow() {
// 		if (!this.glowMaterial || !this.wheelGlow) return;

// 		Tween.stopAllByTarget(this.wheelGlow);

// 		this.glowMaterial.setProperty('glowStrength', 1.4);
// 		this.glowMaterial.setProperty('edgeGlow', 2.0);
// 		this.glowMaterial.setProperty('shimmerStrength', 0.25);
// 		this.glowMaterial.setProperty('rippleStrength', 0.12);
// 		this.glowMaterial.setProperty('noiseStrength', 0.18);
// 		this.glowMaterial.setProperty('neonWidth', 0.14);
// 		this.glowMaterial.setProperty('neonIntensity', 3.0);
// 		this.glowMaterial.setProperty('speed', 1.4);

// 		this.wheelGlow.setScale(new Vec3(1, 1, 1));

// 		tween(this.wheelGlow)
// 			.repeatForever(
// 				tween()
// 					.to(0.35, { scale: new Vec3(1.08, 1.08, 1) })
// 					.to(0.35, { scale: new Vec3(1.0, 1.0, 1) }),
// 			)
// 			.start();
// 	}

// 	private stopGlow() {
// 		if (!this.glowMaterial || !this.wheelGlow) return;

// 		Tween.stopAllByTarget(this.wheelGlow);
// 		this.wheelGlow.setScale(new Vec3(1, 1, 1));

// 		this.applyGlowIdleState();
// 	}

// 	private applyGlowIdleState() {
// 		if (!this.glowMaterial) return;

// 		this.glowMaterial.setProperty('glowStrength', 0.35);
// 		this.glowMaterial.setProperty('edgeGlow', 1.1);
// 		this.glowMaterial.setProperty('shimmerStrength', 0.08);
// 		this.glowMaterial.setProperty('rippleStrength', 0.03);
// 		this.glowMaterial.setProperty('noiseStrength', 0.05);
// 		this.glowMaterial.setProperty('neonWidth', 0.1);
// 		this.glowMaterial.setProperty('neonIntensity', 1.5);
// 		this.glowMaterial.setProperty('speed', 0.6);
// 	}
// }
