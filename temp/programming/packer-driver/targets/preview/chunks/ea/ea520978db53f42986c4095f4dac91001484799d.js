System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, EventBus, _crd, eventBus;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5dbd8HLF3FKopL5Dy9Ettpm", "EventBus", undefined);

      EventBus = class EventBus {
        constructor() {
          this.listeners = new Map();
        }

        on(event, callback) {
          if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
          }

          this.listeners.get(event).push(callback);
        }

        off(event, callback) {
          var arr = this.listeners.get(event);
          if (!arr) return;
          var index = arr.indexOf(callback);
          if (index !== -1) arr.splice(index, 1);
        }

        emit(event, payload) {
          var arr = this.listeners.get(event);
          if (!arr) return;
          arr.forEach(cb => cb(payload));
        }

      };

      _export("eventBus", eventBus = new EventBus());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ea520978db53f42986c4095f4dac91001484799d.js.map