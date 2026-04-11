System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Input, input, Vec3, Animation, SpriteFrame, Sprite, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, BLOCK_SIZE, PlayerController;

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
      Vec3 = _cc.Vec3;
      Animation = _cc.Animation;
      SpriteFrame = _cc.SpriteFrame;
      Sprite = _cc.Sprite;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a7ec742c+lLTowEgsav7flP", "PlayerController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EventMouse', 'Input', 'input', 'Node', 'Vec3', 'Animation', 'SpriteFrame', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BLOCK_SIZE", BLOCK_SIZE = 40);

      _export("PlayerController", PlayerController = (_dec = ccclass('PlayerController'), _dec2 = property(Animation), _dec3 = property({
        type: SpriteFrame
      }), _dec4 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = class PlayerController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "BodyAnim", _descriptor, this);

          // 站立的精灵帧
          _initializerDefineProperty(this, "idleSpriteFrame", _descriptor2, this);

          // 跳跃的精灵帧
          _initializerDefineProperty(this, "jumpSpriteFrame", _descriptor3, this);

          this._startJump = false;
          this._jumpStep = 0;
          this._curJumpTime = 0;
          // 当前跳跃的时长，需要跟下面设置的进行对比，来确定是否完成一次跳跃
          this._jumpTime = 0.1;
          // 整个跳跃的时长
          this._curJumpSpeed = 0;
          // 速度
          this._curPos = new Vec3();
          // 当前角色的位置
          this._deltaPos = new Vec3(0, 0, 0);
          this._targetPos = new Vec3();
          // 最终的落点
          this._curMoveIndex = 0;
          // 移动了多少步
          this.sprite = null;
        }

        start() {
          this.sprite = this.BodyAnim.getComponent(Sprite);
          input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        }

        reset() {
          this._curMoveIndex = 0; // this.node.setPosition(this._curPos);

          this.node.setPosition(Vec3.ZERO);

          this._targetPos.set(0, 0, 0);
        }

        setInputActive(active) {
          if (active) {
            input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
          } else {
            input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
          }
        }

        update(deltaTime) {
          // 开始跳跃
          if (this._startJump) {
            this.setJumpSpriteFrame(); // 累计总得跳跃时间

            this._curJumpTime += deltaTime; // 如果总得跳跃时长大于设置的时长

            if (this._curJumpTime > this._jumpTime) {
              // 结束了
              this.node.setPosition(this._targetPos);
              this._startJump = false;
              this.onJumpEnd();
              this.setIdleSpriteFrame();
            } else {
              // 跳跃中
              this.node.getPosition(this._curPos); // 每一帧根据速度和时间计算位移

              this._deltaPos.x = this._curJumpSpeed * deltaTime; // 应用这个位移

              Vec3.add(this._curPos, this._curPos, this._deltaPos); // 把位置给角色，进行移动

              this.node.setPosition(this._curPos);
            }
          }
        } // 站立


        setIdleSpriteFrame() {
          if (this.sprite && this.idleSpriteFrame) {
            this.sprite.spriteFrame = this.idleSpriteFrame;
          }
        } // 设置跳跃的精灵帧


        setJumpSpriteFrame() {
          if (this.sprite && this.jumpSpriteFrame) {
            this.sprite.spriteFrame = this.jumpSpriteFrame;
          }
        } // 鼠标按下


        onMouseUp(event) {
          if (event.getButton() === 0) {
            this.jumpByStep(1);
          } else if (event.getButton() === 2) {
            this.jumpByStep(2);
          }
        } // 步数跳跃


        jumpByStep(step) {
          if (this._startJump) {
            return;
          }

          this._startJump = true;
          this._jumpStep = step;
          this._curJumpTime = 0;
          var clipName = step === 1 ? 'oneStep' : 'twoStep';
          var state = this.BodyAnim.getState(clipName);
          this._jumpTime = state.duration;
          this._curJumpSpeed = this._jumpStep * BLOCK_SIZE / this._jumpTime; // 计算速度

          this.node.getPosition(this._curPos); // 获取当前角色的位置

          Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep * BLOCK_SIZE, 0, 0)); // 计算目标位置

          if (this.BodyAnim) {
            if (step === 1) {
              this.BodyAnim.play('oneStep');
            } else if (step === 2) {
              this.BodyAnim.play('twoStep');
            }
          }

          this._curMoveIndex += step;
        } // 监听跳跃结束


        onJumpEnd() {
          this.node.emit('jumpEnd', this._curMoveIndex);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "BodyAnim", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "idleSpriteFrame", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "jumpSpriteFrame", [_dec4], {
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
//# sourceMappingURL=afc4440cc56e8babb36c32369373d55d94a2232c.js.map