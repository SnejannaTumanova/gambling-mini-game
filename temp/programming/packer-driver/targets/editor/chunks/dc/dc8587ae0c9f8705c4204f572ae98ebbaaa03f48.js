System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, WheelController, UIController, GameService, RandomService, GameFlowState, GameConfig, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfWheelController(extras) {
    _reporterNs.report("WheelController", "../game/WheelController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIController(extras) {
    _reporterNs.report("UIController", "../ui/UIController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBet(extras) {
    _reporterNs.report("Bet", "../data/Types", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBetType(extras) {
    _reporterNs.report("BetType", "../data/Types", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRoundOutcome(extras) {
    _reporterNs.report("RoundOutcome", "../data/Types", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameService(extras) {
    _reporterNs.report("GameService", "../services/GameService", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRandomService(extras) {
    _reporterNs.report("RandomService", "../services/RandomService", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameFlowState(extras) {
    _reporterNs.report("GameFlowState", "./GameFlowState", _context.meta, extras);
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
    }, function (_unresolved_2) {
      WheelController = _unresolved_2.WheelController;
    }, function (_unresolved_3) {
      UIController = _unresolved_3.UIController;
    }, function (_unresolved_4) {
      GameService = _unresolved_4.GameService;
    }, function (_unresolved_5) {
      RandomService = _unresolved_5.RandomService;
    }, function (_unresolved_6) {
      GameFlowState = _unresolved_6.GameFlowState;
    }, function (_unresolved_7) {
      GameConfig = _unresolved_7.GameConfig;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a2c1fIlV4xDMrh8fYJoS3FB", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(_crd && WheelController === void 0 ? (_reportPossibleCrUseOfWheelController({
        error: Error()
      }), WheelController) : WheelController), _dec3 = property(_crd && UIController === void 0 ? (_reportPossibleCrUseOfUIController({
        error: Error()
      }), UIController) : UIController), _dec(_class = (_class2 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "wheelController", _descriptor, this);

          _initializerDefineProperty(this, "uiController", _descriptor2, this);

          this.balance = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).START_BALANCE;
          this.currentBet = {
            type: 'red',
            amount: (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).DEFAULT_BET
          };
          this.flowState = (_crd && GameFlowState === void 0 ? (_reportPossibleCrUseOfGameFlowState({
            error: Error()
          }), GameFlowState) : GameFlowState).IDLE;
          this.gameService = new (_crd && GameService === void 0 ? (_reportPossibleCrUseOfGameService({
            error: Error()
          }), GameService) : GameService)(new (_crd && RandomService === void 0 ? (_reportPossibleCrUseOfRandomService({
            error: Error()
          }), RandomService) : RandomService)());
        }

        // для создания сервиса с конкретным шансом 50%
        start() {
          this.uiController.setInteractionEnabled(false); //выключаю кнопки

          this.syncUI();
          this.uiController.hideResult();
          this.uiController.setInteractionEnabled(true); // включаю после результата
        } //  SYNC UI


        syncUI() {
          this.uiController.updateBalance(this.balance);
          this.uiController.updateBet(this.currentBet.amount);
          this.uiController.updateSelectedColor(this.currentBet.type);
        } //  BET ACTIONS


        increaseBet(amount) {
          if (this.flowState !== (_crd && GameFlowState === void 0 ? (_reportPossibleCrUseOfGameFlowState({
            error: Error()
          }), GameFlowState) : GameFlowState).IDLE) return; //надо было вынести в отдельный метод...

          const available = this.balance - this.currentBet.amount;
          if (available < amount) return;
          this.currentBet.amount += amount;
          this.syncUI();
        }

        resetBet() {
          if (this.flowState !== (_crd && GameFlowState === void 0 ? (_reportPossibleCrUseOfGameFlowState({
            error: Error()
          }), GameFlowState) : GameFlowState).IDLE) return;
          this.currentBet.amount = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).RESET_BET;
          this.syncUI();
        }

        selectColor(color) {
          if (this.flowState !== (_crd && GameFlowState === void 0 ? (_reportPossibleCrUseOfGameFlowState({
            error: Error()
          }), GameFlowState) : GameFlowState).IDLE) return;
          this.currentBet.type = color;
          this.uiController.updateSelectedColor(color); // чтобы не перегружать логикой syncUI
        } // GAME FLOW


        play() {
          if (this.flowState !== (_crd && GameFlowState === void 0 ? (_reportPossibleCrUseOfGameFlowState({
            error: Error()
          }), GameFlowState) : GameFlowState).IDLE) return;

          if (!this.gameService.canPlay(this.balance, this.currentBet)) {
            // бизнес-логика в сервисе (правила)
            console.log('Cannot play');
            return;
          }

          this.uiController.playButtonClickAnimation();
          this.uiController.playClick();
          this.flowState = (_crd && GameFlowState === void 0 ? (_reportPossibleCrUseOfGameFlowState({
            error: Error()
          }), GameFlowState) : GameFlowState).SPINNING;
          this.uiController.hideResult();
          this.uiController.setInteractionEnabled(false);
          const isWin = this.gameService.rollWin(); // определяем исход

          const outcome = this.gameService.resolveRound(this.balance, this.currentBet, isWin);
          const prevBalance = this.balance;
          this.wheelController.spinTo(outcome.resultType, () => {
            this.onSpinComplete(outcome, prevBalance);
          });
        }

        onSpinComplete(outcome, prevBalance) {
          this.flowState = (_crd && GameFlowState === void 0 ? (_reportPossibleCrUseOfGameFlowState({
            error: Error()
          }), GameFlowState) : GameFlowState).SHOWING_RESULT; //  сохраняем старую ставку

          const previousBetAmount = this.currentBet.amount;
          this.balance = outcome.nextBalance; // ФИКС СТАВКИ

          if (this.currentBet.amount > this.balance) {
            this.currentBet.amount = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).RESET_BET;
          }

          if (outcome.isWin) {
            this.uiController.animateBalance(prevBalance, this.balance, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).BALANCE_ANIMATION_DURATION);
          } else {
            this.uiController.updateBalance(this.balance);
          } // используем старую ставку, потому что outcome.reward при проигрыше равен 0


          const displayAmount = outcome.isWin ? outcome.reward : previousBetAmount;
          this.uiController.showResult(outcome.isWin, displayAmount);
          this.scheduleOnce(() => {
            // таймер показа результата
            this.uiController.hideResult();
            this.flowState = (_crd && GameFlowState === void 0 ? (_reportPossibleCrUseOfGameFlowState({
              error: Error()
            }), GameFlowState) : GameFlowState).IDLE;
            this.uiController.setInteractionEnabled(true);
            this.syncUI();
          }, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).RESULT_SHOW_DURATION);
        }

        getOppositeColor(color) {
          return color === 'red' ? 'black' : 'red';
        } //  UI BUTTONS


        onAdd10() {
          this.uiController.playClick();
          this.increaseBet((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).BET_STEP_SMALL);
        }

        onAdd50() {
          this.uiController.playClick();
          this.increaseBet((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).BET_STEP_BIG);
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
        } // private isIdle(): boolean {
        // 	return this.flowState === GameFlowState.IDLE;
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "wheelController", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "uiController", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=dc8587ae0c9f8705c4204f572ae98ebbaaa03f48.js.map