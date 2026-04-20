import { _decorator, Component, Animation, Collider2D, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property({type: Number, tooltip: '敌人速度'})
    enemySpeed: number = 100;

    // 定义动画
    @property({type: Animation, tooltip: '敌人销毁动画'})
    enemyAnimation: Animation = null;

    @property({type: Number, tooltip: '敌人的血量'})
    enemyHp: number = 1;

    // 是否销毁
    isDestroyed: boolean = false; // 撞到子弹或者超出屏幕则销毁

    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this)
        }
    }

    update(deltaTime: number) {
        // 敌人从上往下移动
        if (this.enemyHp > 0) {
            this.node.y -= this.enemySpeed * deltaTime;
        }
        if (this.enemyHp <= 0) {
            this.enemyAnimation.play()
            this.isDestroyed = true;
        }
    }

    // 碰撞
    beginContact() {
        this.enemyHp--;
    }
}


