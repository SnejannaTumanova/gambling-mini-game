System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, LoseStrategy, _crd;

  function _reportPossibleCrUseOfBet(extras) {
    _reporterNs.report("Bet", "../data/Types", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResultStrategy(extras) {
    _reporterNs.report("ResultStrategy", "./ResultStrategy", _context.meta, extras);
  }

  _export("LoseStrategy", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ca3e3DrhstLZrWsHhWX5sqm", "LoseStrategy", undefined);

      _export("LoseStrategy", LoseStrategy = class LoseStrategy {
        // баланс минус ставка
        apply(balance, bet) {
          return balance - bet.amount;
        } // ничего не выиграли


        getReward(_bet) {
          return 0;
        }

      }); // Стратегия проигрыша уменьшает баланс и возвращает нулевой reward.


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a9d76a286ce82de1afda40acf8ca59a9145bbdf3.js.map