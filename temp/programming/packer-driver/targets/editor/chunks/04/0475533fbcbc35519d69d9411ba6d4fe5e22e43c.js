System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, WinStrategy, LoseStrategy, GameConfig, GameService, _crd;

  function _reportPossibleCrUseOfBet(extras) {
    _reporterNs.report("Bet", "../data/Types", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBetType(extras) {
    _reporterNs.report("BetType", "../data/Types", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRoundOutcome(extras) {
    _reporterNs.report("RoundOutcome", "../data/Types", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRandomService(extras) {
    _reporterNs.report("RandomService", "./RandomService", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWinStrategy(extras) {
    _reporterNs.report("WinStrategy", "../strategies/WinStrategy", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLoseStrategy(extras) {
    _reporterNs.report("LoseStrategy", "../strategies/LoseStrategy", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResultStrategy(extras) {
    _reporterNs.report("ResultStrategy", "../strategies/ResultStrategy", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../data/GameConfig", _context.meta, extras);
  }

  _export("GameService", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      WinStrategy = _unresolved_2.WinStrategy;
    }, function (_unresolved_3) {
      LoseStrategy = _unresolved_3.LoseStrategy;
    }, function (_unresolved_4) {
      GameConfig = _unresolved_4.GameConfig;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b2790zOI8hKW7jL9LCTvpTq", "GameService", undefined);

      _export("GameService", GameService = class GameService {
        constructor(randomService) {
          this.randomService = void 0;
          // можно было бы тоже передать в DI, но сейчас они фиксированы, поэтому пока так, а вот RandomService можно менять и тестировать без изменения логики тут
          this.winStrategy = new (_crd && WinStrategy === void 0 ? (_reportPossibleCrUseOfWinStrategy({
            error: Error()
          }), WinStrategy) : WinStrategy)();
          this.loseStrategy = new (_crd && LoseStrategy === void 0 ? (_reportPossibleCrUseOfLoseStrategy({
            error: Error()
          }), LoseStrategy) : LoseStrategy)();
          this.randomService = randomService;
        }

        rollWin(chance = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
          error: Error()
        }), GameConfig) : GameConfig).CHANCE) {
          //передаём шанс, получаем true/false
          return this.randomService.rollWin(chance);
        }

        canPlay(balance, bet) {
          // проверяем есть ли ставка и хватает ли денег
          if (!bet) return false;
          if (bet.amount <= 0) return false;
          if (bet.amount > balance) return false;
          return true;
        }

        resolveRound(balance, bet, isWin) {
          // в зависимости от результата выбирается стратегия, которая определяет - как изменится баланс.
          const strategy = isWin ? this.winStrategy : this.loseStrategy;
          const nextBalance = strategy.apply(balance, bet);
          const reward = strategy.getReward(bet);
          const resultType = isWin ? bet.type : bet.type === 'red' ? 'black' : 'red';
          return {
            isWin,
            reward,
            nextBalance,
            resultType
          };
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0475533fbcbc35519d69d9411ba6d4fe5e22e43c.js.map