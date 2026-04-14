import { _decorator, AudioClip, AudioSource, Collider2D, Component, Contact2DType, director, Input, input, instantiate, Label, Node, Prefab, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player')
export class player extends Component {

    // 轮盘节点
    @property(Node)
    Target_Node: Node = null;

    // 箭的预载体
    @property(Prefab)
    Arrow_Prefab: Prefab = null;

    // 存放箭节点
    @property(Node)
    Jian_Parent_Node: Node = null;

    // 提示框节点
    @property(Node)
    Tip_Node: Node = null;
    @property(Label)
    Tip_Title_Node: Label = null;

    // 总数
    @property(Label)
    Total_Num_Node: Label = null;

    // 音效
    @property(AudioClip)
    Sound_1_Clip: AudioClip = null;
    @property(AudioClip)
    Sound_2_Clip: AudioClip = null;


    // 初始旋转角度
    Rotation_Num: number = 0;
    // 每帧增加的旋转速度
    Rotation_Speed: number = 200;

    // 箭距离箭靶的距离（相对于父节点坐标）
    Distance: number = 44;

    // 箭距离箭靶的距离（相对于箭靶中心坐标）
    Target_Distance: number = -243;

    // 是否碰撞
    is_Collision: boolean = false;

    // 总共发射的箭数量
    Arrow_Num: number = 14;

    // 剑飞行的时间
    Arrow_Time: number = 0.1;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this)
    }

    // 触摸开始事件
    onTouchStart(event: any) {
        // 如果正在发射或者正在碰撞，就不执行
        if (this.is_Collision) {
            return
        }
        // 创建一个剑
        const Arrow_Node = instantiate(this.Arrow_Prefab);
        Arrow_Node.setParent(this.Jian_Parent_Node);
        // 监听碰撞事件
        Arrow_Node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.Begin_Contact, this);

        // 剑向上移动
        tween(Arrow_Node).to(this.Arrow_Time, { position: new Vec3(0, this.Distance, 0) }).call(() => {
            // 这个判断防止最后一把剑，碰到了其他剑，然后触发了成功
            if (this.is_Collision) {
                return
            }
            // 箭插到靶子上
            this.Arrow_to_Target(Arrow_Node)
            // 取消碰撞事件监听
            // Arrow_Node.getComponent(Collider2D).off(Contact2DType.BEGIN_CONTACT, this.Begin_Contact, this);
            // 减少箭的数量
            this.Arrow_Num -= 1;
            this.Total_Num_Node.string = '' + this.Arrow_Num
            // 如果没有箭了，就提示玩家赢了
            if (this.Arrow_Num <= 0) {
                this.onTip(true);
            }
        }).start(); // 让箭节点向上移动
    }

    // 箭插到靶子上
    Arrow_to_Target(Arrow_Node_new: Node) {
        const worldPos = Arrow_Node_new.getWorldPosition(); // 获取箭节点的世界坐标
        Arrow_Node_new.setParent(this.Target_Node); // 将箭节点设置为轮盘的子节点
        Arrow_Node_new.setWorldPosition(worldPos); // 设置箭节点的世界坐标不变
        Arrow_Node_new.angle = -this.Target_Node.angle; // 设置箭节点的旋转角度与轮盘相反
        // 设置箭节点的碰撞组为2，表示可以与这个碰撞组进行碰撞
        const collider = Arrow_Node_new.getComponent(Collider2D);
        if (collider) {
            collider.group = 2
        }
        // 播放音效
        this.playSound1()
    }

    // 剑与其他的剑碰撞事件
    Begin_Contact() {
        this.playSound2()
        this.onTip(false);
    }

    // 处理提示框
    onTip(isWin: boolean) {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this); // 取消触摸事件监听
        this.is_Collision = true;

        // 清除所有剑的碰撞事件监听
        this.Jian_Parent_Node.children.forEach((child) => {
            child.getComponent(Collider2D).off(Contact2DType.BEGIN_CONTACT, this.Begin_Contact, this);
        });

        this.Tip_Node.active = true; // 显示提示框
        this.Tip_Title_Node.string = isWin ? '你赢了' : '你输了';
    }

    // 开始
    start() {
        this.Target_Node.angle = 0; // 初始化轮盘的旋转角度
        this.Total_Num_Node.string = '' + this.Arrow_Num
    }

    // 更新
    update(deltaTime: number) {
        // 如果已经碰撞了，就不执行旋转逻辑
        if (this.is_Collision) {
            return
        }
        if (this.Rotation_Num >= 360) { // 旋转角度大于等于360时，重置旋转角度
            this.Rotation_Num = 0;
        }
        this.Rotation_Num += (this.Rotation_Speed * deltaTime); // 每帧增加旋转角度
        this.Target_Node.angle = this.Rotation_Num; // 设置轮盘的旋转角度
    }

    // 重新开始
    onRestart() {
        director.loadScene('C1');
    }

    // 剑插在靶子上的声音
    playSound1() {
        const Audio = this.node.getComponent(AudioSource)
        Audio.clip = this.Sound_1_Clip
        Audio.play()
    }

    // 剑与其他的剑碰撞
    playSound2() {
        const Audio = this.node.getComponent(AudioSource)
        Audio.clip = this.Sound_2_Clip
        Audio.play()
    }
}
