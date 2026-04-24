import { _decorator, Component, Animation, Contact2DType, CCFloat, Collider2D, AudioClip, AudioSource } from 'cc';
import { EventManager } from './EventManager';
import { GameManage } from './GameManage';

const { ccclass, property } = _decorator;

enum EnemyType {
    one = 1, // 小飞机
    two = 2, // 中飞机
    three = 3, // 大飞机
}

@ccclass('Enemy')
export class Enemy extends Component {
    @property({type: CCFloat, tooltip: '敌人速度'})
    enemySpeed: number = 100;

    @property({type: CCFloat, tooltip: '敌人类型'})
    enemyType: EnemyType = EnemyType.one;

    @property({type: CCFloat, tooltip: '敌人的血量'})
    enemyHp: number = 1;

    @property({type: CCFloat, tooltip: '敌人分数'})
    enemyScore: number = 0;

    // 敌人动画组件
    private enemyAnimation: Animation = null;

    // 是否死亡
    private isDead: boolean = false;

    // 是否游戏结束
    private gameOver: boolean = false;

    // 死亡音效
    @property({type: AudioSource, tooltip: '死亡音效'})
    dieSound: AudioSource = null;
    // 撞击音效
    @property({type: AudioSource, tooltip: '撞击音效'})
    hitSound: AudioSource = null;

    protected onLoad(): void {
        EventManager.on('GameOver', this.onGameOver, this);
        // 监听炸弹爆炸事件
        EventManager.on('onBoom', this.onBoomExplosion, this);
    }
    protected onDestroy(): void {
        EventManager.off('GameOver', this.onGameOver, this);
        // 移除炸弹爆炸事件
        EventManager.off('onBoom', this.onBoomExplosion, this);
    }

    start() {
        // 获取动画组件
        this.enemyAnimation = this.getComponent(Animation);
        // 获取碰撞组件
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this)
        }
    }

    update(deltaTime: number) {
        // 敌人从上往下移动
        if (this.enemyHp > 0 && !this.isDead && !this.gameOver) {
            this.node.y -= this.enemySpeed * deltaTime;

            // 敌人到达底部，销毁
            if (
                (this.enemyType === EnemyType.one && this.node.y < -675) ||
                (this.enemyType === EnemyType.two && this.node.y < -700) ||
                (this.enemyType === EnemyType.three && this.node.y < -772)
            ) {
                this.isDead = true;
                this.getComponent(Collider2D).enabled = false;
                this.node.destroy()
            }
        }
    }

    // 碰撞
    beginContact() {
        if (this.gameOver) return;
        this.enemyHp -= 1
        if (this.enemyHp <= 0) {
            this.die()
        } else {
            // 子弹打到敌人，敌人还没死，播放撞击音效
            if (this.hitSound) {
                this.hitSound.play()
            }
            // 播放撞击动画
            if (this.enemyAnimation?.clips?.length > 1) {
                this.enemyAnimation.play(this.enemyAnimation.clips[1].name)
            }
        }
    }

    // 敌人死亡处理 isSound 是否播放死亡音效
    die(isSound: boolean = true) {
        // 更新分数
        EventManager.emit('updateScore', this.enemyScore);
        // 敌人死亡，更新游戏状态
        this.isDead = true;
        // 禁用碰撞组件
        this.getComponent(Collider2D).enabled = false;
        // 播放死亡音效
        if (isSound) {
            this.dieSound.play()
        }
        // 播放死亡动画
        this.enemyAnimation.play()
        // 动画播放结束，销毁敌人
        this.enemyAnimation.once(Animation.EventType.FINISHED, () => {
            this.node.destroy()
        }, this)
    }

    onGameOver() {
        this.gameOver = true
        if (this.enemyAnimation) {
            this.enemyAnimation.stop();
        }
    }

    // 炸弹爆炸事件 无论什么敌人，都一击毙命
    onBoomExplosion() {
        this.die(false)
    }
}


