import { _decorator, Component, EventMouse, Input, input, Node, Vec3, Animation, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

export const BLOCK_SIZE = 40

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property(Animation)
    BodyAnim:Animation = null;

    // 站立的精灵帧
    @property({ type: SpriteFrame })
    idleSpriteFrame: SpriteFrame = null;

    // 跳跃的精灵帧
    @property({ type: SpriteFrame })
    jumpSpriteFrame: SpriteFrame = null;

    private _startJump: boolean = false;
    private _jumpStep: number = 0;
    private _curJumpTime: number = 0; // 当前跳跃的时长，需要跟下面设置的进行对比，来确定是否完成一次跳跃
    private _jumpTime: number = 0.1; // 整个跳跃的时长
    private _curJumpSpeed: number = 0; // 速度
    private _curPos: Vec3 = new Vec3(); // 当前角色的位置
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    private _targetPos: Vec3 = new Vec3(); // 最终的落点

    private _curMoveIndex: number = 0; // 移动了多少步

    private sprite: Sprite = null;

    start() {
        this.sprite = this.BodyAnim.getComponent(Sprite);
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this)
    }

    reset() {
        this._curMoveIndex = 0;
        // this.node.setPosition(this._curPos);
        this.node.setPosition(Vec3.ZERO);
        this._targetPos.set(0, 0, 0);
    }

    setInputActive(active: boolean) {
        if (active) {
            input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this)
        } else {
            input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this)
        }
    }

    update(deltaTime: number) {
        // 开始跳跃
        if (this._startJump) {
            this.setJumpSpriteFrame();
            // 累计总得跳跃时间
            this._curJumpTime += deltaTime
            // 如果总得跳跃时长大于设置的时长
            if (this._curJumpTime > this._jumpTime) {
                // 结束了
                this.node.setPosition(this._targetPos)
                this._startJump = false
                this.onJumpEnd();
                this.setIdleSpriteFrame();
            } else {
                // 跳跃中
                this.node.getPosition(this._curPos)
                // 每一帧根据速度和时间计算位移
                this._deltaPos.x = this._curJumpSpeed * deltaTime
                // 应用这个位移
                Vec3.add(this._curPos, this._curPos, this._deltaPos)
                // 把位置给角色，进行移动
                this.node.setPosition(this._curPos)
            }
        }
    }

    // 站立
    setIdleSpriteFrame() {
        if (this.sprite && this.idleSpriteFrame) {
            this.sprite.spriteFrame = this.idleSpriteFrame;
        }
    }

    // 设置跳跃的精灵帧
    setJumpSpriteFrame() {
        if (this.sprite && this.jumpSpriteFrame) {
            this.sprite.spriteFrame = this.jumpSpriteFrame;
        }
    }

    // 鼠标按下
    onMouseUp(event: EventMouse) {
        if (event.getButton() === 0) {
            this.jumpByStep(1)
        } else if (event.getButton() === 2) {
            this.jumpByStep(2)
        }
    }

    // 步数跳跃
    jumpByStep(step: number) {
        if (this._startJump) {
            return
        }
        this._startJump = true
        this._jumpStep = step
        this._curJumpTime = 0

        const clipName = step === 1 ? 'oneStep' : 'twoStep'
        const state = this.BodyAnim.getState(clipName)
        this._jumpTime = state.duration

        this._curJumpSpeed = this._jumpStep * BLOCK_SIZE / this._jumpTime // 计算速度
        this.node.getPosition(this._curPos) // 获取当前角色的位置
        Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep * BLOCK_SIZE, 0, 0)) // 计算目标位置

        if (this.BodyAnim) {
            if (step === 1) {
                this.BodyAnim.play('oneStep')
            } else if (step === 2) {
                this.BodyAnim.play('twoStep')
            }
        }
        this._curMoveIndex += step;
    }

    // 监听跳跃结束
    onJumpEnd() {
        this.node.emit('jumpEnd', this._curMoveIndex);
    }

}


