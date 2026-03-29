System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Node, tween, Button, Vec3, UIOpacity, Tween, Color, instantiate, Prefab, AudioSource, GameConfig, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _crd, ccclass, property, UIController;

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
      Label = _cc.Label;
      Node = _cc.Node;
      tween = _cc.tween;
      Button = _cc.Button;
      Vec3 = _cc.Vec3;
      UIOpacity = _cc.UIOpacity;
      Tween = _cc.Tween;
      Color = _cc.Color;
      instantiate = _cc.instantiate;
      Prefab = _cc.Prefab;
      AudioSource = _cc.AudioSource;
    }, function (_unresolved_2) {
      GameConfig = _unresolved_2.GameConfig;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bd8b5Vdg8dDR5Hl6iVjsovK", "UIController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Node', 'tween', 'Button', 'Vec3', 'UIOpacity', 'Tween', 'Color', 'instantiate', 'Prefab', 'AudioSource']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UIController", UIController = (_dec = ccclass('UIController'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Button), _dec9 = property(Button), _dec10 = property(Button), _dec11 = property(Button), _dec12 = property(Button), _dec13 = property(Button), _dec14 = property(Node), _dec15 = property(Node), _dec16 = property(Prefab), _dec17 = property(AudioSource), _dec18 = property(AudioSource), _dec19 = property(AudioSource), _dec(_class = (_class2 = class UIController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "balanceLabel", _descriptor, this);

          // ! = Сейчас null, но в редакторе Cocos я обязательно подставлю ссылки.
          _initializerDefineProperty(this, "betLabel", _descriptor2, this);

          _initializerDefineProperty(this, "resultRoot", _descriptor3, this);

          _initializerDefineProperty(this, "resultBackground", _descriptor4, this);

          _initializerDefineProperty(this, "resultLabel", _descriptor5, this);

          _initializerDefineProperty(this, "resultAmountLabel", _descriptor6, this);

          _initializerDefineProperty(this, "playButton", _descriptor7, this);

          _initializerDefineProperty(this, "resetBetButton", _descriptor8, this);

          _initializerDefineProperty(this, "add10Button", _descriptor9, this);

          _initializerDefineProperty(this, "add50Button", _descriptor10, this);

          _initializerDefineProperty(this, "redButton", _descriptor11, this);

          _initializerDefineProperty(this, "blackButton", _descriptor12, this);

          _initializerDefineProperty(this, "overlayBlocker", _descriptor13, this);

          _initializerDefineProperty(this, "coinsRoot", _descriptor14, this);

          _initializerDefineProperty(this, "coinPrefab", _descriptor15, this);

          _initializerDefineProperty(this, "winSound", _descriptor16, this);

          _initializerDefineProperty(this, "loseSound", _descriptor17, this);

          _initializerDefineProperty(this, "clickSound", _descriptor18, this);

          this.currentBalance = 0;
          this.currentBet = 0;
          this.selectedColor = 'red';
          this.isInteractionEnabled = true;
        }

        start() {
          this.hideResult(); // сркываем мод окно результата

          this.playIdleAnimation(); // дыхвние кнопки PLAY

          this.overlayBlocker && (this.overlayBlocker.active = false); // выключаем оверлей

          this.updateSelectedColor(this.selectedColor); // выбранный цвет анимируется (по умолчанию красный)

          this.addHoverEffect(this.playButton);
          this.addHoverEffect(this.resetBetButton);
          this.addHoverEffect(this.add10Button);
          this.addHoverEffect(this.add50Button);
        } // =====================
        // DATA UPDATE
        // =====================


        updateBalance(value) {
          this.currentBalance = value;
          this.balanceLabel.string = value.toLocaleString(); // не 1000, а 1 000 - так красивее
        }

        updateBet(value) {
          this.currentBet = value;
          this.betLabel.string = value.toString(); //пропустила, надо было для общего UI - тоже toLocaleString()

          this.refreshBetControls(); //доступность кнопок повышения ставки
        }

        refreshBetControls() {
          var available = this.currentBalance - this.currentBet;
          this.setButtonState(this.add10Button, available >= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).BET_STEP_SMALL);
          this.setButtonState(this.add50Button, available >= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).BET_STEP_BIG);
        } // =====================
        // BALANCE
        // =====================


        animateBalance(from, to, duration) {
          if (duration === void 0) {
            duration = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).BALANCE_ANIMATION_DURATION;
          }

          var obj = {
            value: from
          }; //промежуточный объект, потому что напрямую строку анимировать нельзя, где from - начальная стадия

          tween(obj).to(duration, {
            value: to
          }, // to - результат к которому мы должны прийти
          {
            onUpdate: () => {
              this.balanceLabel.string = Math.floor(obj.value).toLocaleString(); // каждый кадр рисуем промежуточное число
            }
          }).start();
        } // =====================
        // RESULT
        // =====================


        showResult(isWin, amount) {
          var _this$winSound, _this$loseSound;

          this.resultRoot.active = true; //включаем popup результата.

          isWin ? (_this$winSound = this.winSound) == null ? void 0 : _this$winSound.play() : (_this$loseSound = this.loseSound) == null ? void 0 : _this$loseSound.play(); // нужный звук, ?. = если он есть

          this.animateResultBackground();

          if (isWin) {
            this.setWinState(amount);
          } else {
            this.setLoseState(amount);
          }

          this.playResultAnimation(isWin);
        }

        playResultAnimation(isWin) {
          this.unscheduleAllCallbacks(); // удаляем старые отложенные вызовы

          Tween.stopAllByTarget(this.resultRoot); // останавливаем старые анимации popup

          this.resultRoot.setPosition(0, 0, 0);
          this.resultRoot.setScale( // начальный Scale popup, перед появлением
          new Vec3((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).RESULT_POPUP_START_SCALE, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).RESULT_POPUP_START_SCALE, 1));
          var opacity = this.resultRoot.getComponent(UIOpacity); // получаем компонент прозрачности

          if (!opacity) {
            opacity = this.resultRoot.addComponent(UIOpacity); // если его нет - создаем
          }

          opacity.opacity = 0; // анимация появления текста ( 2 анимации scale animation + fade animation параллельно)

          tween(this.resultRoot).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).RESULT_POPUP_BOUNCE_IN_1, {
            scale: new Vec3( //чуть больше, чем должен быть = как бы резиновое появление - motion
            (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).RESULT_POPUP_MID_SCALE, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).RESULT_POPUP_MID_SCALE, 1)
          }).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).RESULT_POPUP_BOUNCE_IN_2, {
            scale: Vec3.ONE // норма

          }).start();
          tween(opacity).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).FADE_DURATION, {
            opacity: 255
          }).start(); // при этом текст плавно становится видимым
          // WIN

          if (isWin) {
            tween(this.resultAmountLabel.node).repeatForever( // сумма выигрыша бесконечно пульсирует, а за время отвечает таймер в onSpinComplete внутри GameManager
            tween().to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).WIN_AMOUNT_PULSE_DURATION, {
              scale: new Vec3((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).WIN_AMOUNT_SCALE, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).WIN_AMOUNT_SCALE, 1)
            }).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).WIN_AMOUNT_PULSE_DURATION, {
              scale: Vec3.ONE
            })).start();
          } // LOSE
          else {
            this.scheduleOnce(() => {
              // задержка, для анимации , чтобы пользователь успел прочитать инфо, можно было сделать через .delay
              tween(this.resultRoot).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).LOSE_DROP_DURATION, {
                position: new Vec3(0, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                  error: Error()
                }), GameConfig) : GameConfig).LOSE_DROP_Y, 0),
                scale: new Vec3((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                  error: Error()
                }), GameConfig) : GameConfig).LOSE_DROP_SCALE, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                  error: Error()
                }), GameConfig) : GameConfig).LOSE_DROP_SCALE, 1)
              }).start();
              tween(opacity).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).LOSE_DROP_DURATION, {
                opacity: 0
              }).start();
            }, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).LOSE_DROP_DELAY);
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

        animateResultBackground() {
          if (!this.resultBackground) return;
          this.resultBackground.active = true;
          var bgOpacity = this.resultBackground.getComponent(UIOpacity) || this.resultBackground.addComponent(UIOpacity);
          bgOpacity.opacity = 0;
          tween(bgOpacity).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).FADE_DURATION, {
            opacity: (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).OVERLAY_OPACITY
          }).start();
          this.resultBackground.setScale(new Vec3(0.9, 0.9, 1));
          tween(this.resultBackground).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).FADE_DURATION, {
            scale: new Vec3(1, 1, 1)
          }).start();
        }

        setWinState(amount) {
          this.resultLabel.string = 'YOU WIN';
          this.resultAmountLabel.string = "+" + amount;
          this.resultLabel.color = new Color(255, 215, 0); // золотой текст

          this.resultAmountLabel.color = new Color(255, 215, 0);
          this.spawnCoins(); // + монетки
        }

        setLoseState(amount) {
          this.resultLabel.string = 'YOU LOSE';
          this.resultAmountLabel.string = "-" + amount;
          this.resultLabel.color = new Color(30, 30, 30); // тёмно-серый цвет

          this.resultAmountLabel.color = new Color(30, 30, 30);
        } // =====================
        // COLOR SELECTION
        // =====================


        updateSelectedColor(color) {
          //отвечает за анимацию выбранной кнопки цвета
          this.selectedColor = color;
          this.animateColorButton(this.redButton.node, color === 'red');
          this.animateColorButton(this.blackButton.node, color === 'black');
        }

        animateColorButton(node, isActive) {
          Tween.stopAllByTarget(node); // останавливаем прежнюю анимацию

          node.setScale(Vec3.ONE); // возвращаем скейл в норму

          if (!isActive) return; // если эта кнопка не активна, то это всё, а если это выбранная кнопка, то назначаем ей новую анимацию

          node.setScale(new Vec3(1.2, 1.2, 1));
          tween(node).repeatForever(tween().to(0.6, {
            scale: new Vec3(1.3, 1.3, 1)
          }).to(0.6, {
            scale: new Vec3(1.2, 1.2, 1)
          })).start();
        } // =====================
        // INTERACTION
        // =====================


        setInteractionEnabled(enabled) {
          //выключаем кнопки + включаем overlay
          this.isInteractionEnabled = enabled;
          var buttons = [this.playButton, this.resetBetButton, this.add10Button, this.add50Button, this.redButton, this.blackButton];
          buttons.forEach(btn => this.setButtonState(btn, enabled)); // вкл/выкл все кнопки

          if (enabled) {
            this.refreshBetControls(); // корректировка по доступности кнопок увеличения ставки
          }

          this.updateSelectedColor(enabled ? this.selectedColor : null); // и снова активируем дыхание выбранного цвета, после разблок

          this.handleOverlay(enabled);
        }

        handleOverlay(enabled) {
          if (!this.overlayBlocker) return;
          this.overlayBlocker.active = true;
          var opacity = this.overlayBlocker.getComponent(UIOpacity) || this.overlayBlocker.addComponent(UIOpacity);

          if (!enabled) {
            // плавно появляется
            opacity.opacity = 0;
            tween(opacity).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).FADE_DURATION, {
              opacity: (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).OVERLAY_OPACITY
            }).start();
          } else {
            // плавно исчезает
            tween(opacity).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).FADE_DURATION, {
              opacity: 0
            }).call(() => {
              this.overlayBlocker.active = false;
              this.playIdleAnimation(); // снова включаем дыхание кнопки PLAY
            }).start();
          }
        }

        setButtonState(button, enabled) {
          if (!button) return; // защита от отсутствующей ссылки.

          var node = button.node;
          button.interactable = enabled; //логическое вкл/выкл кнопки

          var opacity = node.getComponent(UIOpacity) || node.addComponent(UIOpacity);
          Tween.stopAllByTarget(opacity); //стоп старую анимацию, если она ещё идёт

          tween(opacity).to((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).FADE_DURATION, {
            opacity: enabled ? 255 : (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).DISABLED_OPACITY // прозрачность для enabled = 255, для не enabled = 140

          }).start();
          if (!enabled) node.setScale(Vec3.ONE); // в выкл состоянии все кнопки стандарного одинакового размера
        } // =====================
        // HOVER
        // =====================


        addHoverEffect(button) {
          var node = button.node;
          node.on(Node.EventType.MOUSE_ENTER, () => {
            if (!button.interactable) return; // если кнопка не активна, то никакой реакции

            Tween.stopAllByTarget(node);
            tween(node).to(0.1, {
              scale: new Vec3(1.07, 1.07, 1)
            }).start();
          });
          node.on(Node.EventType.MOUSE_LEAVE, () => {
            Tween.stopAllByTarget(node);
            tween(node).to(0.1, {
              scale: Vec3.ONE
            }).start();
          });
        } // =====================
        // MISC
        // =====================


        playIdleAnimation() {
          // дыхание кнопки PLAY
          var node = this.playButton.node;
          Tween.stopAllByTarget(node);
          tween(node).repeatForever(tween().to(0.8, {
            scale: new Vec3(1.05, 1.05, 1)
          }).to(0.8, {
            scale: Vec3.ONE
          })).start();
        }

        playButtonClickAnimation() {
          // растягивание кнопки при клике
          var node = this.playButton.node;
          tween(node).to(0.08, {
            scale: new Vec3(0.95, 0.95, 1)
          }) // кнопка сначла слегка вдавливается
          .to(0.08, {
            scale: new Vec3(1.05, 1.05, 1)
          }) // потом чуть подпрыгивает
          .to(0.08, {
            scale: Vec3.ONE
          }) // потом возвращается в норму
          .start();
        }

        spawnCoins() {
          var _this = this;

          if (!this.coinsRoot || !this.coinPrefab) return; // только если есть префаб

          var _loop = function _loop() {
            // создаём 8 монеток для анимации получения выигрыша
            var coin = instantiate(_this.coinPrefab); // клонируем 8 монгеток из префаба, можно при масштабировании использовать object pooling

            _this.coinsRoot.addChild(coin); // добавляем на сцену


            var randomX = (Math.random() - 0.5) * 200; // случайная траектория разброса монеток по X оси

            var randomY = 150 + Math.random() * 100; // случайная траектория разброса монеток по Y оси

            tween(coin).to(0.6, {
              position: new Vec3(randomX, randomY, 0),
              // монетка вылетает вверх/в сторону
              scale: Vec3.ONE
            }).to(0.3, {
              position: new Vec3(randomX, randomY - 200, 0) // потом падает ниже

            }).call(() => coin.destroy()) //после окончания анимации удаляется
            .start();
          };

          for (var i = 0; i < 8; i++) {
            _loop();
          }
        }

        playClick() {
          var _this$clickSound, _this$clickSound2;

          (_this$clickSound = this.clickSound) == null || _this$clickSound.stop(); // останавливаем текущий clickSound

          (_this$clickSound2 = this.clickSound) == null || _this$clickSound2.play(); // запускаем заново, чтобы короткий звук клика всегда начинался с начала и не наслаивался неаккуратно при частых нажатиях
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "balanceLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "betLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "resultRoot", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "resultBackground", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "resultLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "resultAmountLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "playButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "resetBetButton", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "add10Button", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "add50Button", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "redButton", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "blackButton", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "overlayBlocker", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "coinsRoot", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "coinPrefab", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "winSound", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "loseSound", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "clickSound", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e7fa86f00e520dcae46c980ff7cf374a9a83e24a.js.map