System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _class, _crd, ccclass, FullscreenController;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f690bwjJDJB/5hbF3Urx/D3", "FullscreenController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass
      } = _decorator);

      _export("FullscreenController", FullscreenController = (_dec = ccclass('FullscreenController'), _dec(_class = class FullscreenController extends Component {
        constructor() {
          super(...arguments);
          this.isFullscreen = false;
        }

        onLoad() {
          // подписываемся  и ждём взаимодействия
          this.node.on(Node.EventType.TOUCH_START, this.tryFullscreen, this);
          this.node.on(Node.EventType.MOUSE_DOWN, this.tryFullscreen, this);
        }

        tryFullscreen() {
          if (document.fullscreenElement) return; // если уже fullscreen — ничего не делаем

          document.documentElement.requestFullscreen == null || document.documentElement.requestFullscreen().catch(() => {
            //пытаемся включить fullscreen, если браузер не дал — не падаем
            console.log('Fullscreen blocked');
          });
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=16194285eb8bf0d1e73b3f9ffe7d5e5d532214d8.js.map