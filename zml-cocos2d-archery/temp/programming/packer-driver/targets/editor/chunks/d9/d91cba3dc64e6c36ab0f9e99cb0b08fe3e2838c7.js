System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioClip, AudioSource, Collider2D, Component, Contact2DType, director, Input, input, instantiate, Label, Node, Prefab, tween, Vec3, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, player;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      AudioClip = _cc.AudioClip;
      AudioSource = _cc.AudioSource;
      Collider2D = _cc.Collider2D;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      director = _cc.director;
      Input = _cc.Input;
      input = _cc.input;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "028aa34Zq9Ezbke7DrrWndi", "player", undefined);

      __checkObsolete__(['_decorator', 'AudioClip', 'AudioSource', 'Collider2D', 'Component', 'Contact2DType', 'director', 'Input', 'input', 'instantiate', 'Label', 'Node', 'Prefab', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("player", player = (_dec = ccclass('player'), _dec2 = property(Node), _dec3 = property(Prefab), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(AudioClip), _dec9 = property(AudioClip), _dec(_class = (_class2 = class player extends Component {
        constructor(...args) {
          super(...args);

          // 轮盘节点
          _initializerDefineProperty(this, "Target_Node", _descriptor, this);

          // 箭的预载体
          _initializerDefineProperty(this, "Arrow_Prefab", _descriptor2, this);

          // 存放箭节点
          _initializerDefineProperty(this, "Jian_Parent_Node", _descriptor3, this);

          // 提示框节点
          _initializerDefineProperty(this, "Tip_Node", _descriptor4, this);

          _initializerDefineProperty(this, "Tip_Title_Node", _descriptor5, this);

          // 总数
          _initializerDefineProperty(this, "Total_Num_Node", _descriptor6, this);

          // 音效
          _initializerDefineProperty(this, "Sound_1_Clip", _descriptor7, this);

          _initializerDefineProperty(this, "Sound_2_Clip", _descriptor8, this);

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
          // 是否碰撞
          this.is_Collision = false;
          // 总共发射的箭数量
          this.Arrow_Num = 10;
        }

        onLoad() {
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        }

        onDestroy() {
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        } // 触摸开始事件


        onTouchStart(event) {
          // 如果正在发射或者已经碰撞了，就不执行发射逻辑
          if (this.is_Collision) {
            return;
          }

          const Arrow_Node_new = instantiate(this.Arrow_Prefab);
          Arrow_Node_new.setParent(this.Jian_Parent_Node);
          Arrow_Node_new.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.Begin_Contact, this);
          tween(Arrow_Node_new).to(0.1, {
            position: new Vec3(0, this.Distance, 0)
          }).call(() => {
            // 这个判断防止最后一把剑，碰到了其他剑，然后触发了成功
            if (this.is_Collision) {
              return;
            }

            this.Arrow_to_Target(Arrow_Node_new);
            Arrow_Node_new.getComponent(Collider2D).off(Contact2DType.BEGIN_CONTACT, this.Begin_Contact, this);
            this.Arrow_Num -= 1;
            this.Total_Num_Node.string = '' + this.Arrow_Num;

            if (this.Arrow_Num <= 0) {
              this.onTip(true);
            }
          }).start(); // 让箭节点向上移动
        } // 箭插到靶子上


        Arrow_to_Target(Arrow_Node_new) {
          const worldPos = Arrow_Node_new.getWorldPosition(); // 获取箭节点的世界坐标

          Arrow_Node_new.setParent(this.Target_Node); // 将箭节点设置为轮盘的子节点

          Arrow_Node_new.setWorldPosition(worldPos); // 设置箭节点的世界坐标不变

          Arrow_Node_new.angle = -this.Target_Node.angle; // 设置箭节点的旋转角度与轮盘相反

          this.playSound1();
        } // 箭与靶子碰撞事件


        Begin_Contact() {
          this.playSound2();
          this.onTip(false);
        } // 处理提示框


        onTip(isWin) {
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this); // 取消触摸事件监听

          this.is_Collision = true;
          this.Tip_Node.active = true; // 显示提示框

          if (isWin) {
            this.Tip_Title_Node.string = '你赢了';
          } else {
            this.Tip_Title_Node.string = '你输了';
          }
        } // 开始


        start() {
          this.Target_Node.angle = 0; // 初始化轮盘的旋转角度

          this.Total_Num_Node.string = '' + this.Arrow_Num; // 创建第一支箭
          // this.Arrow_Node = instantiate(this.Arrow_Prefab); // 实例化箭的预载体
          // this.Arrow_Node.setParent(this.Jian_Parent_Node);
        } // 更新


        update(deltaTime) {
          // 如果已经碰撞了，就不执行旋转逻辑
          if (this.is_Collision) {
            return;
          }

          if (this.Rotation_Num >= 360) {
            // 旋转角度大于等于360时，重置旋转角度
            this.Rotation_Num = 0;
          }

          this.Rotation_Num += this.Rotation_Speed * deltaTime; // 每帧增加旋转角度

          this.Target_Node.angle = this.Rotation_Num; // 设置轮盘的旋转角度
        } // 重新开始


        onRestart() {
          director.loadScene('C1');
        } // 剑插在靶子上的声音


        playSound1() {
          const Audio = this.node.getComponent(AudioSource);
          Audio.clip = this.Sound_1_Clip;
          Audio.play();
        } // 剑与其他的剑碰撞


        playSound2() {
          const Audio = this.node.getComponent(AudioSource);
          Audio.clip = this.Sound_2_Clip;
          Audio.play();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Target_Node", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "Arrow_Prefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "Jian_Parent_Node", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "Tip_Node", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "Tip_Title_Node", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "Total_Num_Node", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "Sound_1_Clip", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "Sound_2_Clip", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d91cba3dc64e6c36ab0f9e99cb0b08fe3e2838c7.js.map