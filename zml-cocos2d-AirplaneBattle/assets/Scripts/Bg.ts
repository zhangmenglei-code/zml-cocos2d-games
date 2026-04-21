import { _decorator, AudioSource, Component, Node, UITransform } from 'cc';
import { EventManager } from './EventManager';
const { ccclass, property } = _decorator;

@ccclass('Bg')
export class Bg extends Component {

    // 背景节点1
    @property(Node)
    bg1: Node = null;

    // 背景节点2
    @property(Node)
    bg2: Node = null;

    // 运动速度
    @property
    speed: number = 100;

    // 背景音效
    bgSound: AudioSource = null;

    // 背景父节点高度
    bgParentHeight: number = 0;

    gameOver: boolean = false;

    onLoad() {
        EventManager.on("GameOver", this.onGameOver, this);
        // 获取背景音效组件
        this.bgSound = this.getComponent(AudioSource);
    }

    protected onDestroy(): void {
        EventManager.off("GameOver", this.onGameOver, this);
    }

    start() {
        this.bgParentHeight = this.node.getComponent(UITransform).height;
        this.bg1.y = 0
        this.bg2.y = this.bgParentHeight
    }

    update(deltaTime: number) {
        if(this.gameOver) return
        this.bg1.y -= this.speed * deltaTime;
        this.bg2.y -= this.speed * deltaTime;
        // 背景循环
        if (this.bg1.position.y <= -this.bgParentHeight) {
            this.bg1.y = this.bg2.y + this.bgParentHeight;
        }
        if (this.bg2.position.y <= -this.bgParentHeight) {
            this.bg2.y = this.bg1.y + this.bgParentHeight;
        }
    }

    onGameOver() {
        this.gameOver = true
        this.bgSound.stop();
    }
}


