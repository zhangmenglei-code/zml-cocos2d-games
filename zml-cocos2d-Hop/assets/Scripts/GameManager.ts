import { _decorator, CCInteger, Component, instantiate, Label, Node, Prefab, Vec3 } from 'cc';
import { BLOCK_SIZE, PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

enum BlockType{
    BT_NONE, // 空格
    BT_STONE, // 土地
}

@ccclass('GameManager')
export class GameManager extends Component {

    @property({type: Prefab})
    public boxPrefab: Prefab|null = null;
    
    @property({type: CCInteger})
    public roadLength: number = 50;
    private _road: BlockType[] = [];

    @property({ type: Node })
    public startMenu: Node | null = null; // 开始的 UI
    @property({ type: Label })
    public meunTitle: Label | null = null; // 结束的 UI 标题

    @property({ type: PlayerController })
    public playerCtrl: PlayerController | null = null; // 角色控制器

    @property({type: Label}) 
    public stepsLabel: Label|null = null; // 计步器

    start() {
        this.init()
        this.playerCtrl.node.on('jumpEnd', this.onPlayerJumpEnd, this)
    }

    update(deltaTime: number) {}

    // 游戏进行中
    init() {
        this.generateRoad()
        // 隐藏开始菜单
        if (this.startMenu) {
            this.startMenu.active = false
        }
        // 重置计步器
        if (this.stepsLabel) {
            this.stepsLabel.string = '0'
        }
        // 重置角色
        if (this.playerCtrl) {
            this.playerCtrl.node.setPosition(Vec3.ZERO)
            this.playerCtrl.reset()
        }
        // 直接设置active会直接开始监听鼠标事件，做了一下延迟处理
        setTimeout(() => {
            if (this.playerCtrl) {
                this.playerCtrl.setInputActive(true)
            }
        }, 0.1);
    }

    // 游戏结束
    gameEnd() {
        if (this.startMenu) {
            this.startMenu.active = true
        }
        // 设置角色输入禁用
        if (this.playerCtrl) {
            this.playerCtrl.setInputActive(false)
            // this.playerCtrl.node.setPosition(Vec3.ZERO) // 
            // this.playerCtrl.reset()
        }
    }

    // 生成路面
    generateRoad() {
        this.node.removeAllChildren()
        this._road = [];
        // 第一块
        this._road.push(BlockType.BT_STONE);
        // 中间地块
        for (let i = 1; i < this.roadLength - 1; i++) {
            if (this._road[i - 1] === BlockType.BT_NONE) {
                this._road.push(BlockType.BT_STONE);
            } else {
                this._road.push(Math.floor(Math.random() * 2))
            }
        }
        // 最后一块
        this._road.push(BlockType.BT_STONE);

        for (let i = 0; i < this._road.length; i++) {
            const block: Node|null = this.spawnBlockByType(this._road[i]);
            if (block) {
                this.node.addChild(block);
                block.setPosition(i * BLOCK_SIZE, 0, 0);
            }
        }
    }

    // 根据类型生成方块
    spawnBlockByType(type: BlockType) {
        if (!this.boxPrefab) {
            return null;
        }
        let block: Node|null = null
        switch (type) {
            case BlockType.BT_STONE:
                block = instantiate(this.boxPrefab);
                break;
        }
        return block;
    }

    // 监听跳跃结束
    onPlayerJumpEnd(moveIndex: number) {
        if (this.stepsLabel) {
            this.stepsLabel.string = '' + (moveIndex + 1)
        }
        this.checkPlayerJump(moveIndex);
    }

    // 检查角色是否跳跃到坑里 、或者跳完所有地块
    checkPlayerJump(moveIndex: number) {
        // 没跳完之前
        if (moveIndex < this.roadLength) {
            // 跳到坑里
            if (this._road[moveIndex] === BlockType.BT_NONE) {
                this.gameEnd();
                if (this.meunTitle) {
                    this.meunTitle.string = '跳到坑里，游戏失败';
                }
            }
        }
        // 跳完所有地块
        if (moveIndex + 1 === this.roadLength) {
            this.gameEnd();
            if (this.meunTitle) {
                this.meunTitle.string = '游戏胜利';
            }
        }
        // 跳出边界
        if (moveIndex + 1 > this.roadLength) {
            this.gameEnd();
            if (this.meunTitle) {
                this.meunTitle.string = '跳过界了，游戏失败';
            }
        }
    }

    // 点击重新开始按钮
    onStartButtonClicked() {
        this.init();
    }
}


