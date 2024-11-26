"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("StackQueue", () => {
    let queue;
    beforeEach(() => {
        queue = new index_1.StackQueue();
    });
    test("새로 생성된 큐는 비어있어야 합니다", () => {
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
    });
    test("enqueue 작업이 올바르게 동작해야 합니다", () => {
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.size()).toBe(2);
        expect(queue.isEmpty()).toBe(false);
    });
    test("dequeue 작업이 FIFO 순서로 동작해야 합니다", () => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.dequeue()).toBe(1);
        expect(queue.dequeue()).toBe(2);
        expect(queue.dequeue()).toBe(3);
        expect(queue.isEmpty()).toBe(true);
    });
    test("비어있는 큐에서 dequeue 시 undefined를 반환해야 합니다", () => {
        expect(queue.dequeue()).toBeUndefined();
    });
    test("큐의 크기가 올바르게 계산되어야 합니다", () => {
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.size()).toBe(2);
        queue.dequeue();
        expect(queue.size()).toBe(1);
        queue.dequeue();
        expect(queue.size()).toBe(0);
    });
});
