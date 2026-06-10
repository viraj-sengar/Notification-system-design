"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MinHeap_1 = require("../src/heap/MinHeap");
describe('MinHeap', () => {
    test('push/pop maintains min order', () => {
        const heap = new MinHeap_1.MinHeap((a, b) => a - b);
        heap.push(5);
        heap.push(1);
        heap.push(3);
        expect(heap.pop()).toBe(1);
        expect(heap.pop()).toBe(3);
        expect(heap.pop()).toBe(5);
        expect(heap.pop()).toBeUndefined();
    });
});
