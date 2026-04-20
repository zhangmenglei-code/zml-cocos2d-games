import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    
    @property({type: Number, tooltip: '子弹速度'})
    bulletSpeed: number = 300;

    // 是否碰到敌人
    isHitEnemy: boolean = false;

    start() {

    }

    update(deltaTime: number) {
        this.node.y += this.bulletSpeed * deltaTime;

        // 如果碰到敌人，或者y轴超出边界，则销毁
        if (this.node.y > 1090 || this.isHitEnemy) {
            // 销毁整个节点
            this.node.destroy()
            // 销毁本组件
            // this.destroy()
        }
    }
}


