import { _decorator, Component, EventTouch, Input, input, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

// 子弹类型
enum BulletType {
    one, // 发射一颗子弹
    two // 发射两颗子弹
}

@ccclass('Player')
export class Player extends Component {

    // 左右边界
    moveX: number = 350;
    // 上下边界
    moveY: number = 570;

    @property({type: Number, tooltip: '子弹发射频率(快0 - 慢1)'})
    bulletTime: number = 0.5;

    @property({type: Prefab, tooltip: '子弹1预制体'})
    bulletPrefab1: Prefab = null;

    @property({type: Prefab, tooltip: '子弹2预制体'})
    bulletPrefab2: Prefab = null;

    @property({ type: Node, tooltip: '子弹父节点' })
    bulletParent: Node = null;

    @property({ type: Node, tooltip: '子弹类型1的世界坐标' })
    bulletWorldPosition1: Node = null;

    @property({ type: Node, tooltip: '子弹类型2-1的世界坐标' })
    bulletWorldPosition2_1: Node = null;
    @property({ type: Node, tooltip: '子弹类型2-2的世界坐标' })
    bulletWorldPosition2_2: Node = null;

    // 计时器
    bulletTimer: number = 0;

    // 子弹类型
    bulletType: BulletType = BulletType.two;

    protected onLoad(): void {
        // 监听触摸
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    protected onDestroy(): void {
        // 移除触摸
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    // 触摸移动
    onTouchMove(event: EventTouch) {
        const position = this.node.position;
        const targetPosition = new Vec3(position.x + event.getDeltaX(), position.y + event.getDeltaY(), position.z)
        // 判断边界
        // 左边界
        if (targetPosition.x < -this.moveX) {
            targetPosition.x = -this.moveX
        }
        // 右边界
        if (targetPosition.x > this.moveX) {
            targetPosition.x = this.moveX
        }
        // 上边界
        if (targetPosition.y > this.moveY) {
            targetPosition.y = this.moveY
        }
        // 下边界
        if (targetPosition.y < -this.moveY) {
            targetPosition.y = -this.moveY
        }
        this.node.setPosition(targetPosition)
    }

    start() {

    }

    update(deltaTime: number) {
        switch (this.bulletType) {
            case BulletType.one:
                this.oneBullet(deltaTime)
                break;
            case BulletType.two:
                this.twoBullet(deltaTime)
                break;
        }
    }

    // 子弹类型1
    oneBullet(deltaTime: number) {
        this.bulletTimer += deltaTime;
        if (this.bulletTimer >= this.bulletTime) {
            this.bulletTimer = 0;
            // 创建子弹
            let bullet = instantiate(this.bulletPrefab1);
            // 添加到父节点
            this.bulletParent.addChild(bullet);
            // 设置世界坐标
            bullet.setWorldPosition(this.bulletWorldPosition1.worldPosition);
        }
    }
    // 子弹类型2
    twoBullet(deltaTime: number) { 
        this.bulletTimer += deltaTime;
        if (this.bulletTimer >= this.bulletTime) {
            this.bulletTimer = 0;
            // 创建子弹
            let bullet1 = instantiate(this.bulletPrefab2);
            let bullet2 = instantiate(this.bulletPrefab2);
            // 添加到父节点
            this.bulletParent.addChild(bullet1);
            this.bulletParent.addChild(bullet2);
            // 设置世界坐标
            bullet1.setWorldPosition(this.bulletWorldPosition2_1.worldPosition);
            bullet2.setWorldPosition(this.bulletWorldPosition2_2.worldPosition);
        }
    }
}


