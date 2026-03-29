System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, ParticleSystem2D, tween, Tween, UIOpacity, Vec3, GameConfig, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, WheelController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBetType(extras) {
    _reporterNs.report("BetType", "../data/Types", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../data/GameConfig", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      ParticleSystem2D = _cc.ParticleSystem2D;
      tween = _cc.tween;
      Tween = _cc.Tween;
      UIOpacity = _cc.UIOpacity;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      GameConfig = _unresolved_2.GameConfig;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e1d6fOqKDhIg6Mg+inkxRBJ", "WheelController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'ParticleSystem2D', 'tween', 'Tween', 'UIOpacity', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("WheelController", WheelController = (_dec = ccclass('WheelController'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(ParticleSystem2D), _dec(_class = (_class2 = class WheelController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "wheel", _descriptor, this);

          // колесо
          _initializerDefineProperty(this, "pointer", _descriptor2, this);

          // стрелочка
          _initializerDefineProperty(this, "wheelGlow", _descriptor3, this);

          // фон
          _initializerDefineProperty(this, "wheelParticles", _descriptor4, this);

          // я пыталась добавить частицы, но не получилось, а блок кода остался
          this.isSpinning = false;
          // guard - защита от повторного запуска
          this.sectors = ['red', 'black', 'red', 'black', 'red', 'black', 'red', 'black'];
        }

        // логическая модель колеса (порядок секторов)
        start() {
          if (this.wheelGlow) {
            this.wheelGlow.active = true; // включаем фон

            const opacity = this.wheelGlow.getComponent(UIOpacity) || this.wheelGlow.addComponent(UIOpacity);
            opacity.opacity = 80; // при старте прозрачность 80, чтобы при запуске концентрировать внимание на яркости
          }
        }

        spinTo(resultType, onComplete) {
          if (this.isSpinning) return; // нельзя крутить повторно

          this.isSpinning = true; // блокируем UI

          this.startGlow(); // включаем эффекты

          const rotation = this.calculateRotationForType(resultType); // считаем угол
          // колесо в дефолтном положении

          this.wheel.setRotationFromEuler(0, 0, 0);
          this.wheel.setScale(new Vec3(1, 1, 1));
          Tween.stopAllByTarget(this.wheel); // удаляем старые анимации

          tween(this.wheel).to(2.5, {
            eulerAngles: new Vec3(0, 0, rotation)
          }, {
            easing: 'cubicOut'
          } // вращение на вычесленный угол, причём сначала быстрее, потом медленее
          ).call(() => {
            this.playPointerBounce(); // стрелочка дёргается

            this.stopGlow(); // фон останавливается

            tween(this.wheel) // лёгкий удар колеса при остановке
            .to(0.05, {
              scale: new Vec3(1.03, 1.03, 1)
            }).to(0.05, {
              scale: new Vec3(1, 1, 1)
            }).call(() => {
              this.isSpinning = false; // разблокируем UI

              onComplete(); // сообщаем GameManager
            }).start();
          }).start();
        }

        calculateRotationForType(resultType) {
          const baseSpins = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).WHEEL_SPINS * 360; // обязательно делаем несколько полных оборотов

          const sectorSize = 360 / this.sectors.length; // 45 - размер одного сектора

          const halfSector = sectorSize / 2; // 22.5 - соответственно середина сектора

          const availableIndexes = [];

          for (let i = 0; i < this.sectors.length; i++) {
            if (this.sectors[i] === resultType) {
              availableIndexes.push(i); // поиск подходящих индексов по цвету
            }
          }

          const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)]; // выбираем случайный из списка подходящих, лучше было бы использовать RandomService

          const pointerAngle = 90; // угол нахождения стрелки

          const finalAngle = pointerAngle - (randomIndex * sectorSize + halfSector); // финальный угол на который нужно повернуть колесо, чтобы сектор оказался под стрелкой

          console.log('TARGET TYPE:', resultType, 'SECTOR INDEX:', randomIndex); // мой рабочий лог, можно убрать, я просто тестировала с ним

          return baseSpins + finalAngle; // несколько вращений + нужный угол
        }

        playPointerBounce() {
          // микро-анимация стрелки
          if (!this.pointer) return;
          Tween.stopAllByTarget(this.pointer);
          this.pointer.setScale(new Vec3(1, 1, 1));
          tween(this.pointer).to(0.08, {
            scale: new Vec3(1.15, 1.15, 1)
          }).to(0.08, {
            scale: new Vec3(0.95, 0.95, 1)
          }).to(0.08, {
            scale: new Vec3(1, 1, 1)
          }).start();
        }

        startGlow() {
          if (!this.wheelGlow) return;

          if (this.wheelParticles) {
            this.wheelParticles.resetSystem(); // хотела частицы, но не увидела их
          }

          const opacity = this.wheelGlow.getComponent(UIOpacity) || this.wheelGlow.addComponent(UIOpacity);
          tween(opacity).to(0.2, {
            opacity: 180
          }).start(); // более яркий фон

          tween(this.wheelGlow).repeatForever(tween() // пульсация фона
          .to(0.4, {
            scale: new Vec3(1.2, 1.2, 1)
          }).to(0.4, {
            scale: new Vec3(1.1, 1.1, 1)
          })).start();
        }

        stopGlow() {
          if (!this.wheelGlow) return;

          if (this.wheelParticles) {
            this.wheelParticles.stopSystem(); // выключаем частицы, которые итак не видно :(
          }

          Tween.stopAllByTarget(this.wheelGlow); // стоп на анимацию

          const opacity = this.wheelGlow.getComponent(UIOpacity) || this.wheelGlow.addComponent(UIOpacity);
          tween(opacity).to(0.2, {
            opacity: 80
          }).start(); // возвращаем стартовую норму

          tween(this.wheelGlow).to(0.2, {
            scale: new Vec3(1.1, 1.1, 1)
          }).start();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "wheel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pointer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wheelGlow", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "wheelParticles", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class)); // import {
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


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e9e2bd7b79010d4db38d4c5de916b22ccda56ea0.js.map