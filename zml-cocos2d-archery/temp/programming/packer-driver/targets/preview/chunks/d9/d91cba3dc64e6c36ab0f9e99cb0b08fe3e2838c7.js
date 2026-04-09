System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, player;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

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

      _cclegacy._RF.push({}, "028aa34Zq9Ezbke7DrrWndi", "player", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("player", player = (_dec = ccclass('player'), _dec2 = property(Node), _dec(_class = (_class2 = class player extends Component {
        constructor() {
          super(...arguments);

          // 轮盘节点
          _initializerDefineProperty(this, "Target_Node", _descriptor, this);

          // 初始旋转角度
          this.Rotation_Num = 0;
          // 每帧增加的旋转速度
          this.Rotation_Speed = 50;
        }

        start() {
          this.Target_Node.angle = 0; // 初始化轮盘的旋转角度
        }

        update(deltaTime) {
          if (this.Rotation_Num >= 360) {
            // 旋转角度大于等于360时，重置旋转角度
            this.Rotation_Num = 0;
          }

          this.Rotation_Num += this.Rotation_Speed * deltaTime; // 每帧增加旋转角度

          this.Target_Node.angle = this.Rotation_Num; // 设置轮盘的旋转角度
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Target_Node", [_dec2], {
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
//# sourceMappingURL=d91cba3dc64e6c36ab0f9e99cb0b08fe3e2838c7.js.map