import { _decorator, CCFloat, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { EventManager } from './EventManager';

@ccclass('ToolManage')
export class ToolManage extends Component {
    @property({type: CCFloat, tooltip: '双发子弹道具生成频率（秒）'})
    toolDoubleTime: number = 1;
    @property({type: Prefab, tooltip: '双发子弹道具预载体'})
    toolDoublePrefab: Prefab = null;

    @property({type: CCFloat, tooltip: '炸弹道具生成频率（秒）'})
    toolBombTime: number = 3;
    @property({type: Prefab, tooltip: '炸弹道具预载体'})
    toolBombPrefab: Prefab = null;

    isGameOver: boolean = false;

    start() {
        // 监听游戏结束事件
        EventManager.on('GameOver', this.gameOver, this);
        // 生成双发子弹道具
        this.schedule(this.toolDrop1, this.toolDoubleTime);
        // 生成炸弹道具
        this.schedule(this.toolDrop2, this.toolBombTime);
    }

    protected onDestroy(): void {
        // 移除游戏结束事件监听
        EventManager.off('GameOver', this.gameOver, this);
        // 移除所有道具
        this.unschedule(this.toolDrop1);
        this.unschedule(this.toolDrop2);
    }

    update(deltaTime: number) {
        
    }

    // 生成双发子弹道具
    toolDrop1() {
        this.createTool(this.toolDoublePrefab, -320, 320, 820);
    }

    // 生成炸弹道具
    toolDrop2() {
        this.createTool(this.toolBombPrefab, -320, 320, 820);
    }

    // 生成道具
    createTool(prefab: Prefab, min: number, max: number, y: number) {
        const randomX = math.randomRangeInt(min, max);
        let tool = instantiate(prefab);
        // // 添加到父节点
        this.node.addChild(tool);
        // // 设置世界坐标
        tool.setPosition(randomX, y, 0);
    }

    gameOver() {
        this.isGameOver = true;
        this.unschedule(this.toolDrop1);
        this.unschedule(this.toolDrop2);
    }
}


