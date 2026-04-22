import { _decorator, AudioSource, CCFloat, Collider2D, Component, Contact2DType, Node } from 'cc';
const { ccclass, property } = _decorator;
import { EventManager } from './EventManager';

export enum ToolType {
    double, // 双发子弹
    bomb // 炸弹
}

@ccclass('Tool')
export class Tool extends Component {

    // 下落速度
    @property({type: CCFloat, tooltip: '道具下落速度'})
    toolSpeed: number = 100;

    // 道具类型
    @property({type: CCFloat, tooltip: '道具类型'})
    toolType: ToolType = ToolType.double;

    isGameOver: boolean = false;

    protected onLoad(): void {
        // 获取碰撞组件
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this)
        }
    }

    // 碰撞检测
    beginContact() {
        this.node.destroy()
    }

    start() {
        EventManager.on('GameOver', this.gameOver, this);
    }

    protected onDestroy(): void {
        EventManager.off('GameOver', this.gameOver, this);
    }

    update(deltaTime: number) {
        // 如果游戏结束，则不更新
        if (this.isGameOver) {
            return;
        }
        // 下落
        this.node.y -= this.toolSpeed * deltaTime;
        // 如果超出屏幕，则销毁
        if (this.node.y < -820) {
            this.node.destroy();
        }
    }

    // 游戏结束
    gameOver() {
        this.isGameOver = true;
    }
}


