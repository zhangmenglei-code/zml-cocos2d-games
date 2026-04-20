import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bg')
export class Bg extends Component {

    // 背景节点1
    @property(Node)
    bg1: Node = null;

    // 背景节点2
    @property(Node)
    bg2: Node = null;

    // 运动速度
    @property
    speed: number = 100;

    // 背景父节点高度
    bgParentHeight: number = 0;

    start() {
        this.bgParentHeight = this.node.getComponent(UITransform).height;
        this.bg1.y = 0
        this.bg2.y = this.bgParentHeight
    }

    update(deltaTime: number) {
        this.bg1.y -= this.speed * deltaTime;
        this.bg2.y -= this.speed * deltaTime;
        // 背景循环
        if (this.bg1.position.y <= -this.bgParentHeight) {
            this.bg1.y = this.bg2.y + this.bgParentHeight;
        }
        if (this.bg2.position.y <= -this.bgParentHeight) {
            this.bg2.y = this.bg1.y + this.bgParentHeight;
        }
    }
}


