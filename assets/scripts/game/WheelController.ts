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

const { ccclass, property } = _decorator;

@ccclass('WheelController')
export class WheelController extends Component {
	@property(Node)
	wheel: Node = null!;

	@property(Node)
	pointer: Node = null!;

	@property(Node)
	wheelGlow: Node = null!;

	@property(ParticleSystem2D)
	wheelParticles: ParticleSystem2D = null!;

	private isSpinning: boolean = false;

	private readonly sectors: BetType[] = [
		'red',
		'black',
		'red',
		'black',
		'red',
		'black',
		'red',
		'black',
	];

	start() {
		if (this.wheelGlow) {
			this.wheelGlow.active = true;

			const opacity =
				this.wheelGlow.getComponent(UIOpacity) ||
				this.wheelGlow.addComponent(UIOpacity);

			opacity.opacity = 80;
		}
	}

	spinTo(resultType: BetType, onComplete: () => void) {
		if (this.isSpinning) return;

		this.isSpinning = true;

		this.startGlow();

		const rotation = this.calculateRotationForType(resultType);

		this.wheel.setRotationFromEuler(0, 0, 0);
		this.wheel.setScale(new Vec3(1, 1, 1));

		Tween.stopAllByTarget(this.wheel);

		tween(this.wheel)
			.to(
				2.5,
				{ eulerAngles: new Vec3(0, 0, rotation) },
				{ easing: 'cubicOut' },
			)
			.call(() => {
				this.playPointerBounce();
				this.stopGlow();

				tween(this.wheel)
					.to(0.05, { scale: new Vec3(1.03, 1.03, 1) })
					.to(0.05, { scale: new Vec3(1, 1, 1) })
					.call(() => {
						this.isSpinning = false;
						onComplete();
					})
					.start();
			})
			.start();
	}

	private calculateRotationForType(resultType: BetType): number {
		const baseSpins = GameConfig.WHEEL_SPINS * 360;

		const sectorSize = 360 / this.sectors.length; // 45
		const halfSector = sectorSize / 2; // 22.5

		const availableIndexes: number[] = [];

		for (let i = 0; i < this.sectors.length; i++) {
			if (this.sectors[i] === resultType) {
				availableIndexes.push(i);
			}
		}

		const randomIndex =
			availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

		const pointerAngle = 90;

		const finalAngle = pointerAngle - (randomIndex * sectorSize + halfSector);

		console.log('TARGET TYPE:', resultType, 'SECTOR INDEX:', randomIndex);

		return baseSpins + finalAngle;
	}

	private playPointerBounce() {
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
			this.wheelParticles.resetSystem();
		}

		const opacity =
			this.wheelGlow.getComponent(UIOpacity) ||
			this.wheelGlow.addComponent(UIOpacity);

		tween(opacity).to(0.2, { opacity: 180 }).start();

		tween(this.wheelGlow)
			.repeatForever(
				tween()
					.to(0.4, { scale: new Vec3(1.2, 1.2, 1) })
					.to(0.4, { scale: new Vec3(1.1, 1.1, 1) }),
			)
			.start();
	}

	private stopGlow() {
		if (!this.wheelGlow) return;

		if (this.wheelParticles) {
			this.wheelParticles.stopSystem();
		}

		Tween.stopAllByTarget(this.wheelGlow);

		const opacity =
			this.wheelGlow.getComponent(UIOpacity) ||
			this.wheelGlow.addComponent(UIOpacity);

		tween(opacity).to(0.2, { opacity: 80 }).start();

		tween(this.wheelGlow)
			.to(0.2, { scale: new Vec3(1.1, 1.1, 1) })
			.start();
	}
}
