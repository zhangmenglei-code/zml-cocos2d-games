import { _decorator, Collider2D, Component, Contact2DType, director, Input, input, instantiate, Label, Node, Prefab, tween, Vec3 } from 'cc';
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


    // 初始旋转角度
    Rotation_Num: number = 0;
    // 每帧增加的旋转速度
    Rotation_Speed: number = 50;

    // 箭初始节点
    Arrow_Node: Node = null;

    // 箭距离箭靶的距离（相对于父节点坐标）
    Distance: number = 44;

    // 箭距离箭靶的距离（相对于箭靶中心坐标）
    Target_Distance: number = -243;

    // 存放所有发射的箭
    ArrowList: Node[] = [];

    // 是否碰撞
    is_Collision: boolean = false;

    // 总共发射的箭数量
    Arrow_Num: number = 5;


    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this)
    }

    // 触摸开始事件
    onTouchStart(event: any) {
        // 如果正在发射或者已经碰撞了，就不执行发射逻辑
        if (this.is_Collision) {
            return
        }
        const Arrow_Node_new = instantiate(this.Arrow_Prefab);
        Arrow_Node_new.setParent(this.Jian_Parent_Node);
        Arrow_Node_new.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.Begin_Contact, this);
        tween(Arrow_Node_new).to(0.1, { position: new Vec3(0, this.Distance, 0) }).call(() => {
            this.Arrow_to_Target(Arrow_Node_new)
            Arrow_Node_new.getComponent(Collider2D).off(Contact2DType.BEGIN_CONTACT, this.Begin_Contact, this);
            this.Arrow_Num -= 1;
            this.Total_Num_Node.string = '' + this.Arrow_Num
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
    }

    // 箭与靶子碰撞事件
    Begin_Contact() {
        this.onTip(false);
    }

    // 处理提示框
    onTip(isWin: boolean) {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this); // 取消触摸事件监听
        this.is_Collision = true;
        this.Tip_Node.active = true; // 显示提示框
        if (isWin) {
            this.Tip_Title_Node.string = '你赢了'
        } else {
            this.Tip_Title_Node.string = '你输了'
        }
    }

    // 开始
    start() {
        this.Target_Node.angle = 0; // 初始化轮盘的旋转角度
        this.Total_Num_Node.string = '' + this.Arrow_Num
        // 创建第一支箭
        // this.Arrow_Node = instantiate(this.Arrow_Prefab); // 实例化箭的预载体
        // this.Arrow_Node.setParent(this.Jian_Parent_Node);
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
}
