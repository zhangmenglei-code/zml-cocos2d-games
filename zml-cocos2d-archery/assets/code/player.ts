import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player')
export class player extends Component {

    // 轮盘节点
    @property(Node)
    Target_Node: Node = null;

    // 初始旋转角度
    Rotation_Num: number = 0;
    // 每帧增加的旋转速度
    Rotation_Speed: number = 50;

    start() {
        this.Target_Node.angle = 0; // 初始化轮盘的旋转角度
    }

    update(deltaTime: number) {
        if (this.Rotation_Num >= 360) { // 旋转角度大于等于360时，重置旋转角度
            this.Rotation_Num = 0;
        }
        this.Rotation_Num += (this.Rotation_Speed * deltaTime); // 每帧增加旋转角度
        this.Target_Node.angle = this.Rotation_Num; // 设置轮盘的旋转角度
    }
}
