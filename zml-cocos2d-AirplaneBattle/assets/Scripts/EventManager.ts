import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

type EventCallback = (...args: any[]) => void;

interface EventEntry {
    callback: EventCallback;      // 原始回调
    target: Component;            // 绑定的目标组件
    boundCallback: EventCallback; // 绑定后的回调函数
}

@ccclass('EventManager')
export class EventManager extends Component {
    private static events: Map<string, EventEntry[]> = new Map();

    static on(eventName: string, callback: EventCallback, target: Component = null) {
        const boundCallback = callback.bind(target)
        const entry: EventEntry = { callback, target, boundCallback }
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(entry);
    }

    static off(eventName: string, callback: EventCallback, target: Component = null) {
        const entries = this.events.get(eventName);
        if (!entries) return;
        const index = entries.findIndex(entry => entry.callback === callback && entry.target === target);
        if (index !== -1) entries.splice(index, 1);
        if (entries.length === 0) this.events.delete(eventName);
    }

    static emit(eventName: string, ...args: any[]) {
        const entries = this.events.get(eventName);
        if (!entries) return;
        // 遍历副本，防止回调中修改数组
        [...entries].forEach(entry => {
            entry.boundCallback(...args);
        });
    }
}


