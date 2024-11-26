"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackQueue = void 0;
class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        return this.items.pop();
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
}
class StackQueue {
    constructor() {
        this.inStack = new Stack();
        this.outStack = new Stack();
    }
    enqueue(element) {
        this.inStack.push(element);
    }
    moveElements() {
        if (this.outStack.isEmpty()) {
            while (!this.inStack.isEmpty()) {
                const element = this.inStack.pop();
                if (element) {
                    this.outStack.push(element);
                }
            }
        }
    }
    dequeue() {
        this.moveElements();
        return this.outStack.pop();
    }
    isEmpty() {
        return this.inStack.isEmpty() && this.outStack.isEmpty();
    }
    size() {
        return this.inStack.size() + this.outStack.size();
    }
}
exports.StackQueue = StackQueue;
