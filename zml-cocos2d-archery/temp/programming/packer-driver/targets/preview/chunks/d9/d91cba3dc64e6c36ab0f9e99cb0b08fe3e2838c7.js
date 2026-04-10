System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Input, input, instantiate, Node, Prefab, tween, Vec3, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, player;

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
      Input = _cc.Input;
      input = _cc.input;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "028aa34Zq9Ezbke7DrrWndi", "player", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Input', 'input', 'instantiate', 'Node', 'Prefab', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("player", player = (_dec = ccclass('player'), _dec2 = property(Node), _dec3 = property(Prefab), _dec4 = property(Node), _dec(_class = (_class2 = class player extends Component {
        constructor() {
          super(...arguments);

          // 轮盘节点
          _initializerDefineProperty(this, "Target_Node", _descriptor, this);

          // 箭的预载体
          _initializerDefineProperty(this, "Arrow_Prefab", _descriptor2, this);

          // 存放箭节点
          _initializerDefineProperty(this, "Jian_Parent_Node", _descriptor3, this);

          // 初始旋转角度
          this.Rotation_Num = 0;
          // 每帧增加的旋转速度
          this.Rotation_Speed = 50;
          // 箭初始节点
          this.Arrow_Node = null;
          // 箭距离箭靶的距离（相对于父节点坐标）
          this.Distance = 44;
          // 箭距离箭靶的距离（相对于箭靶中心坐标）
          this.Target_Distance = -243;
          // 存放所有发射的箭
          this.ArrowList = [];
          // 防抖
          this.is_Can_Fire = false;
        }

        onLoad() {
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        }

        onDestroy() {
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        } // 触摸开始事件


        onTouchStart(event) {
          if (this.is_Can_Fire) {
            return;
          }

          this.is_Can_Fire = true;
          var Arrow_Node_new = instantiate(this.Arrow_Prefab);
          Arrow_Node_new.setParent(this.Jian_Parent_Node);
          tween(Arrow_Node_new).to(0.3, {
            position: new Vec3(0, this.Distance, 0)
          }).call(() => {
            this.is_Can_Fire = false;
            this.Arrow_to_Target(Arrow_Node_new);
          }).start(); // 让箭节点向上移动
        } // 箭插到靶子上


        Arrow_to_Target(Arrow_Node_new) {
          var worldPos = Arrow_Node_new.getWorldPosition(); // 获取箭节点的世界坐标

          Arrow_Node_new.setParent(this.Target_Node); // 将箭节点设置为轮盘的子节点

          Arrow_Node_new.setWorldPosition(worldPos); // 设置箭节点的世界坐标不变

          Arrow_Node_new.angle = -this.Target_Node.angle; // 设置箭节点的旋转角度与轮盘相反
        } // 开始


        start() {
          this.Target_Node.angle = 0; // 初始化轮盘的旋转角度
          // 创建第一支箭
          // this.Arrow_Node = instantiate(this.Arrow_Prefab); // 实例化箭的预载体
          // this.Arrow_Node.setParent(this.Jian_Parent_Node);
        } // 更新


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
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "Arrow_Prefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "Jian_Parent_Node", [_dec4], {
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