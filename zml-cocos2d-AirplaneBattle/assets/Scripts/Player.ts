import { _decorator, Animation, AudioSource, CCFloat, CCInteger, Collider2D, Component, Contact2DType, director, EventTouch, Input, input, instantiate, IPhysics2DContact, Node, Prefab, Vec3 } from 'cc';
import { EventManager } from './EventManager';
import { Tool, ToolType } from './Tool';
const { ccclass, property } = _decorator;


// 子弹类型
enum BulletType {
    one, // 发射一颗子弹
    two // 发射两颗子弹
}

@ccclass('Player')
export class Player extends Component {

    @property({type: CCFloat, tooltip: '子弹发射频率(快0 - 慢1)'})
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

    @property({ type: Node, tooltip: '玩家体节点' })
    playerNode: Node = null;

    // 子弹类型
    @property({type: CCInteger, tooltip: '子弹类型'})
    bulletType: BulletType = BulletType.one;

    // 子弹发射音效
    @property({ type: AudioSource, tooltip: '子弹发射音效' })
    bulletSound: AudioSource = null;
    // 死亡音效
    @property({ type: AudioSource, tooltip: '死亡音效' })
    dieSound: AudioSource = null;

    @property({type: CCFloat, tooltip: '无敌时间'})
    invincibleTime: number = 3;

    // 玩家血量
    @property({type: CCInteger, tooltip: '玩家血量'})
    playerHp: number = 3;

    @property({ type: AudioSource, tooltip: '双发子弹道具音效' })
    toolDoubleSound: AudioSource = null;
    @property({ type: AudioSource, tooltip: '炸弹道具音效' })
    toolBombSound: AudioSource = null;

    // 碰撞组件
    private collider: Collider2D = null;

    // 左右边界
    private moveX: number = 350;
    // 上下边界
    private moveY: number = 570;
    // 计时器
    private bulletTimer: number = 0;
    // 死亡
    private isDead: boolean = false;
    // 子节点飞机动画
    private childAnim: Animation = null;
    // 无敌时间
    private invincibleTimer: number = 0;
    // 是否处在无敌状态
    private isInvincible: boolean = false;

    // 道具倒计时
    private toolTimer: number = 0;

    protected onLoad(): void {
        // 监听触摸
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // 获取子节点动画组件
        this.childAnim = this.playerNode.getComponent(Animation);
    }

    protected onDestroy(): void {
        // 移除触摸
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // 移除碰撞
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.beginContact, this)
        }
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
        // 碰撞组件
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this)
        }
    }

    // 碰撞
    beginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        // 判断是否撞到道具
        const tool = otherCollider.getComponent(Tool)
        if (tool) {
            this.hitTool(tool)
        } else {
            this.hitEnemy()
        }
    }

    // 碰撞到敌人
    hitEnemy() {
        this.playerHp -= 1
        // 玩家死亡
        if (this.playerHp <= 0) {
            this.isDead = true;
            // 触摸停止
            input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            // 禁用碰撞组件
            this.collider.enabled = false;
            // 向外告知游戏结束
            EventManager.emit('GameOver');
            // 播放死亡音效
            this.dieSound.play();
            // 播放死亡动画
            this.childAnim.play('PlayerBody-hit')
            // // 播放动画结束
            // this.childAnim.once(Animation.EventType.FINISHED, () => {
            //     this.node.destroy()
            // }, this)
        } else {
            // 只碰撞，但是没死，玩家闪烁，处于无敌状态
            this.isInvincible = true;
            // 播放无敌动画
            this.childAnim.play('PlayerBody-blink')
            // 禁用碰撞组件
            this.collider.enabled = false;
            // 创建无敌时间计时器
            this.invincibleTimer = setInterval(() => {
                if (this.invincibleTimer) {
                    clearInterval(this.invincibleTimer)
                }
                // 无敌时间到，播放普通动画
                this.childAnim.play('PlayerBody')
                this.isInvincible = false;
                // 启用碰撞组件
                this.collider.enabled = true;
            }, this.invincibleTime * 1000)
        }
    }

    // 碰撞到道具
    hitTool(tool: Tool) {
        switch (tool.toolType) {
            case ToolType.bomb:
                // 播放道具音效
                this.toolBombSound.play();
                break;
            case ToolType.double:
                // 如果时间内有道具，先清除，再开启新的倒计时
                if (this.toolTimer) {
                    clearTimeout(this.toolTimer)
                }
                // 播放道具音效
                this.toolDoubleSound.play();
                this.bulletType = BulletType.two;
                // 时间限制
                this.toolTimer = setTimeout(() => {
                    this.bulletType = BulletType.one;
                }, 5000);
                break;
        }
    }

    update(deltaTime: number) {
        if (this.isDead) {
            return;
        }
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
            // 播放子弹发射音效
            this.bulletSound.play();
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
            // 播放子弹发射音效
            this.bulletSound.play();
        }
    }
}


