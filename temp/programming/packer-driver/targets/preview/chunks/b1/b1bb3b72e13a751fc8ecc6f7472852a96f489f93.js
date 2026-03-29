System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, RandomService, _crd;

  _export("RandomService", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "91dccw3R3RDPoi/iklg2Gnj", "RandomService", undefined);

      _export("RandomService", RandomService = class RandomService {
        rollWin(chance) {
          if (chance === void 0) {
            chance = 0.5;
          }

          return Math.random() < chance;
        } // случайное число в диапазоне


        range(min, max) {
          return Math.random() * (max - min) + min;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b1bb3b72e13a751fc8ecc6f7472852a96f489f93.js.map