import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManage')
export class EnemyManage extends Component {

    // 敌人1
    @property(Prefab)
    enemyPrefab1: Prefab = null;
    @property({ type: Number, tooltip: '敌人1生成速度' })
    enemy1CreatSpeed: number = 1;

    // 敌人2
    @property(Prefab)
    enemyPrefab2: Prefab = null;
    @property({ type: Number, tooltip: '敌人2生成速度' })
    enemy2CreatSpeed: number = 3;

    // 敌人3
    @property(Prefab)
    enemyPrefab3: Prefab = null;
    @property({ type: Number, tooltip: '敌人3生成速度' })
    enemy3CreatSpeed: number = 5;

    start() {
        this.schedule(this.createEnemy1, this.enemy1CreatSpeed);
        this.schedule(this.createEnemy2, this.enemy2CreatSpeed);
        this.schedule(this.createEnemy3, this.enemy3CreatSpeed);
    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        this.unschedule(this.createEnemy1);
        this.unschedule(this.createEnemy2);
        this.unschedule(this.createEnemy3);
    }

    // 生成敌人1
    createEnemy1() {
        this.createEnemy(this.enemyPrefab1, -335, 335, 700);
    }

    // 生成敌人2
    createEnemy2() {
        this.createEnemy(this.enemyPrefab2, -325, 325, 720);
    }

    // 生成敌人3
    createEnemy3() {
        this.createEnemy(this.enemyPrefab3, -277, 277, 820);
    }

    // 生成敌人
    createEnemy(prefab: Prefab, min: number, max: number, y: number) {
        const randomX = math.randomRangeInt(min, max);
        let enemy = instantiate(prefab);
        // 添加到父节点
        this.node.addChild(enemy);
        // 设置世界坐标
        enemy.setPosition(randomX, y, 0);
    }
}


