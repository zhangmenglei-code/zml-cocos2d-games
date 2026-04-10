import { _decorator, Component, Input, input, instantiate, Node, Prefab, tween, Vec3 } from 'cc';
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

    // 防抖
    is_Can_Fire: boolean = false;


    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this)
    }

    // 触摸开始事件
    onTouchStart(event: any) {
        if (this.is_Can_Fire) {
            return
        }
        this.is_Can_Fire = true;
        const Arrow_Node_new = instantiate(this.Arrow_Prefab);
        Arrow_Node_new.setParent(this.Jian_Parent_Node);
        tween(Arrow_Node_new).to(0.3, { position: new Vec3(0, this.Distance, 0) }).call(() => {
            this.is_Can_Fire = false;
            this.Arrow_to_Target(Arrow_Node_new)
        }).start(); // 让箭节点向上移动
    }

    // 箭插到靶子上
    Arrow_to_Target(Arrow_Node_new: Node) {
        const worldPos = Arrow_Node_new.getWorldPosition(); // 获取箭节点的世界坐标
        Arrow_Node_new.setParent(this.Target_Node); // 将箭节点设置为轮盘的子节点
        Arrow_Node_new.setWorldPosition(worldPos); // 设置箭节点的世界坐标不变
        Arrow_Node_new.angle = -this.Target_Node.angle; // 设置箭节点的旋转角度与轮盘相反
    }

    // 开始
    start() {
        this.Target_Node.angle = 0; // 初始化轮盘的旋转角度
        
        // 创建第一支箭
        // this.Arrow_Node = instantiate(this.Arrow_Prefab); // 实例化箭的预载体
        // this.Arrow_Node.setParent(this.Jian_Parent_Node);
    }

    // 更新
    update(deltaTime: number) {
        if (this.Rotation_Num >= 360) { // 旋转角度大于等于360时，重置旋转角度
            this.Rotation_Num = 0;
        }
        this.Rotation_Num += (this.Rotation_Speed * deltaTime); // 每帧增加旋转角度
        this.Target_Node.angle = this.Rotation_Num; // 设置轮盘的旋转角度
    }
}
