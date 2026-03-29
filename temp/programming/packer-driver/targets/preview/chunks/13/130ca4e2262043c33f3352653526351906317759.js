System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, WinStrategy, _crd;

  function _reportPossibleCrUseOfBet(extras) {
    _reporterNs.report("Bet", "../data/Types", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResultStrategy(extras) {
    _reporterNs.report("ResultStrategy", "./ResultStrategy", _context.meta, extras);
  }

  _export("WinStrategy", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8da43TCw9NIrJDfFd8AVv0r", "WinStrategy", undefined);

      _export("WinStrategy", WinStrategy = class WinStrategy {
        // баланс + выигрыш x2
        apply(balance, bet) {
          return balance + bet.amount * 2;
        } // сумма выигрыша


        getReward(bet) {
          return bet.amount * 2;
        }

      }); // Стратегия выигрыша увеличивает баланс и возвращает выигрыш.


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=130ca4e2262043c33f3352653526351906317759.js.map