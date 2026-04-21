import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartGame')
export class StartGame extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    // 开始游戏
    onStartGame() {
        // 切换场景游戏场景
        director.loadScene("Scene-game");
    }
}


