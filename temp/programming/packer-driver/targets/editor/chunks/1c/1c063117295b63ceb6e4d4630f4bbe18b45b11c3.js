System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, GameConfig;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "920b0YgR29J9r4KI3t0NK4x", "GameConfig", undefined);

      _export("GameConfig", GameConfig = {
        START_BALANCE: 1000,
        CHANCE: 0.5,
        // bet
        DEFAULT_BET: 100,
        RESET_BET: 0,
        BET_STEP_SMALL: 10,
        BET_STEP_BIG: 50,
        // wheel
        SPIN_DURATION: 2.5,
        WHEEL_SPINS: 5,
        // result / ui
        BALANCE_ANIMATION_DURATION: 1.5,
        RESULT_SHOW_DURATION: 2,
        FADE_DURATION: 0.2,
        OVERLAY_OPACITY: 150,
        DISABLED_OPACITY: 140,
        // selected color button
        SELECTED_COLOR_SCALE: 1.2,
        SELECTED_COLOR_PULSE_SCALE: 1.3,
        SELECTED_COLOR_PULSE_DURATION: 0.6,
        // hover
        HOVER_SCALE: 1.07,
        HOVER_DURATION: 0.1,
        // play button
        PLAY_IDLE_SCALE: 1.05,
        PLAY_IDLE_DURATION: 0.8,
        PLAY_CLICK_SCALE_DOWN: 0.95,
        PLAY_CLICK_SCALE_UP: 1.05,
        PLAY_CLICK_STEP_DURATION: 0.08,
        // result popup
        RESULT_POPUP_START_SCALE: 0.8,
        RESULT_POPUP_MID_SCALE: 1.06,
        RESULT_POPUP_BOUNCE_IN_1: 0.18,
        RESULT_POPUP_BOUNCE_IN_2: 0.12,
        // lose animation
        LOSE_DROP_DELAY: 1.5,
        LOSE_DROP_DURATION: 0.5,
        LOSE_DROP_Y: -80,
        LOSE_DROP_SCALE: 0.9,
        // win amount pulse
        WIN_AMOUNT_SCALE: 1.15,
        WIN_AMOUNT_PULSE_DURATION: 0.5,
        // coins
        COINS_COUNT: 8,
        COIN_START_SCALE: 0.5,
        COIN_FLY_DURATION: 0.6,
        COIN_FALL_DURATION: 0.3,
        COIN_RANDOM_X_RANGE: 200,
        COIN_RANDOM_Y_MIN: 150,
        COIN_RANDOM_Y_EXTRA: 100,
        COIN_FALL_OFFSET_Y: 200
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1c063117295b63ceb6e4d4630f4bbe18b45b11c3.js.map