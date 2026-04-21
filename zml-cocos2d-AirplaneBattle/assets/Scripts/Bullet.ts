import { _decorator, AudioSource, CCInteger, Collider2D, Component, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property({type: CCInteger, tooltip: '子弹速度'})
    bulletSpeed: number = 300;

    // 是否碰到敌人
    isHitEnemy: boolean = false;

    // 屏幕顶部的世界坐标 Y
    private topWorldY: number = 0;

    start() {
        // 获取碰撞组件
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this)
        }
    }

    update(deltaTime: number) {
        if (!this.isHitEnemy && this.node.y < 1073) {
            this.node.y += this.bulletSpeed * deltaTime;
        } else {
            // 禁用碰撞组件
            this.getComponent(Collider2D).enabled = false;
            // 销毁子弹
            this.node.destroy()
        }
    }

    beginContact() {
        this.isHitEnemy = true
    }
}


