System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, GameFlowState;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "70083BCgnxA07p2csMlUoFX", "GameFlowState", undefined);

      _export("GameFlowState", GameFlowState = /*#__PURE__*/function (GameFlowState) {
        GameFlowState["IDLE"] = "IDLE";
        GameFlowState["SPINNING"] = "SPINNING";
        GameFlowState["SHOWING_RESULT"] = "SHOWING_RESULT";
        return GameFlowState;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=70798104cdebe1b73aafd93d4ae266e9d17785df.js.map