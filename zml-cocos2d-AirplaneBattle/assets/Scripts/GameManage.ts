import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { EventManager } from './EventManager';

@ccclass('GameManage')
export class GameManage extends Component {

    // 分数节点
    @property({type: Label, tooltip: '分数节点'})
    scoreNode: Label = null;
    // 暂停节点
    @property({type: Node, tooltip: '暂停节点'})
    pauseNode: Node = null;
    // 开始节点
    @property({type: Node, tooltip: '开始节点'})
    startNode: Node = null;

    // 总分数
    private score: number = 0;
    // 游戏是否暂停
    private isPause: boolean = false;

    // 监听分数更新事件
    protected onLoad(): void {
        EventManager.on('updateScore', this.updateScore, this);
    }
    protected onDestroy(): void {
        EventManager.off('updateScore', this.updateScore, this);
    }

    start() {
        // 初始化分数节点
        this.scoreNode.string = this.score.toString();
    }

    update(deltaTime: number) {
        
    }

    // 更新分数
    public updateScore(score: number) {
        this.score += score;
        this.scoreNode.string = this.score.toString();
    }

    // 暂停
    public gamePause() {
        director.pause()
        this.isPause = true;
        this.pauseNode.active = false
        this.startNode.active = true
        EventManager.emit('gamePause', this.isPause)
    }
    // 继续
    public gameResume() {
        director.resume()
        this.isPause = false
        this.pauseNode.active = true
        this.startNode.active = false
        EventManager.emit('gamePause', this.isPause)
    }
}


