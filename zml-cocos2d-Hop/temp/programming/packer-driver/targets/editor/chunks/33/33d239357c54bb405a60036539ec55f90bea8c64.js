System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCInteger, Component, instantiate, Label, Node, Prefab, Vec3, BLOCK_SIZE, PlayerController, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, BlockType, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBLOCK_SIZE(extras) {
    _reporterNs.report("BLOCK_SIZE", "./PlayerController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerController(extras) {
    _reporterNs.report("PlayerController", "./PlayerController", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CCInteger = _cc.CCInteger;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      BLOCK_SIZE = _unresolved_2.BLOCK_SIZE;
      PlayerController = _unresolved_2.PlayerController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "94f1cOck+xDrIzKxIMY0YHH", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'CCInteger', 'Component', 'instantiate', 'Label', 'Node', 'Prefab', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      BlockType = /*#__PURE__*/function (BlockType) {
        BlockType[BlockType["BT_NONE"] = 0] = "BT_NONE";
        BlockType[BlockType["BT_STONE"] = 1] = "BT_STONE";
        return BlockType;
      }(BlockType || {});

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: CCInteger
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Label
      }), _dec6 = property({
        type: _crd && PlayerController === void 0 ? (_reportPossibleCrUseOfPlayerController({
          error: Error()
        }), PlayerController) : PlayerController
      }), _dec7 = property({
        type: Label
      }), _dec(_class = (_class2 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "boxPrefab", _descriptor, this);

          _initializerDefineProperty(this, "roadLength", _descriptor2, this);

          this._road = [];

          _initializerDefineProperty(this, "startMenu", _descriptor3, this);

          // 开始的 UI
          _initializerDefineProperty(this, "meunTitle", _descriptor4, this);

          // 结束的 UI 标题
          _initializerDefineProperty(this, "playerCtrl", _descriptor5, this);

          // 角色控制器
          _initializerDefineProperty(this, "stepsLabel", _descriptor6, this);
        }

        // 计步器
        start() {
          this.init();
          this.playerCtrl.node.on('jumpEnd', this.onPlayerJumpEnd, this);
        }

        update(deltaTime) {} // 游戏进行中


        init() {
          this.generateRoad(); // 隐藏开始菜单

          if (this.startMenu) {
            this.startMenu.active = false;
          } // 重置计步器


          if (this.stepsLabel) {
            this.stepsLabel.string = '0';
          } // 重置角色


          if (this.playerCtrl) {
            this.playerCtrl.node.setPosition(Vec3.ZERO);
            this.playerCtrl.reset();
          } // 直接设置active会直接开始监听鼠标事件，做了一下延迟处理


          setTimeout(() => {
            if (this.playerCtrl) {
              this.playerCtrl.setInputActive(true);
            }
          }, 0.1);
        } // 游戏结束


        gameEnd() {
          if (this.startMenu) {
            this.startMenu.active = true;
          } // 设置角色输入禁用


          if (this.playerCtrl) {
            this.playerCtrl.setInputActive(false); // this.playerCtrl.node.setPosition(Vec3.ZERO) // 
            // this.playerCtrl.reset()
          }
        } // 生成路面


        generateRoad() {
          this.node.removeAllChildren();
          this._road = []; // 第一块

          this._road.push(BlockType.BT_STONE); // 中间地块


          for (let i = 1; i < this.roadLength - 1; i++) {
            if (this._road[i - 1] === BlockType.BT_NONE) {
              this._road.push(BlockType.BT_STONE);
            } else {
              this._road.push(Math.floor(Math.random() * 2));
            }
          } // 最后一块


          this._road.push(BlockType.BT_STONE);

          for (let i = 0; i < this._road.length; i++) {
            const block = this.spawnBlockByType(this._road[i]);

            if (block) {
              this.node.addChild(block);
              block.setPosition(i * (_crd && BLOCK_SIZE === void 0 ? (_reportPossibleCrUseOfBLOCK_SIZE({
                error: Error()
              }), BLOCK_SIZE) : BLOCK_SIZE), 0, 0);
            }
          }
        } // 根据类型生成方块


        spawnBlockByType(type) {
          if (!this.boxPrefab) {
            return null;
          }

          let block = null;

          switch (type) {
            case BlockType.BT_STONE:
              block = instantiate(this.boxPrefab);
              break;
          }

          return block;
        } // 监听跳跃结束


        onPlayerJumpEnd(moveIndex) {
          if (this.stepsLabel) {
            this.stepsLabel.string = '' + (moveIndex + 1);
          }

          this.checkPlayerJump(moveIndex);
        } // 检查角色是否跳跃到坑里 、或者跳完所有地块


        checkPlayerJump(moveIndex) {
          // 没跳完之前
          if (moveIndex < this.roadLength) {
            // 跳到坑里
            if (this._road[moveIndex] === BlockType.BT_NONE) {
              this.gameEnd();

              if (this.meunTitle) {
                this.meunTitle.string = '跳到坑里，游戏失败';
              }
            }
          } // 跳完所有地块


          if (moveIndex + 1 === this.roadLength) {
            this.gameEnd();

            if (this.meunTitle) {
              this.meunTitle.string = '游戏胜利';
            }
          } // 跳出边界


          if (moveIndex + 1 > this.roadLength) {
            this.gameEnd();

            if (this.meunTitle) {
              this.meunTitle.string = '跳过界了，游戏失败';
            }
          }
        } // 点击重新开始按钮


        onStartButtonClicked() {
          this.init();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "boxPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "roadLength", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "startMenu", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "meunTitle", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "playerCtrl", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "stepsLabel", [_dec7], {
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
//# sourceMappingURL=33d239357c54bb405a60036539ec55f90bea8c64.js.map