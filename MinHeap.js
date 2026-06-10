"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinHeap = void 0;
class MinHeap {
    compare;
    data = [];
    constructor(compare) {
        this.compare = compare;
    }
    size() {
        return this.data.length;
    }
    peek() {
        return this.data[0];
    }
    push(item) {
        this.data.push(item);
        this.bubbleUp(this.data.length - 1);
    }
    pop() {
        if (this.data.length === 0)
            return undefined;
        const top = this.data[0];
        const last = this.data.pop();
        if (last !== undefined && this.data.length > 0) {
            this.data[0] = last;
            this.bubbleDown(0);
        }
        return top;
    }
    toArray() {
        return [...this.data];
    }
    bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.compare(this.data[index], this.data[parent]) >= 0)
                break;
            [this.data[index], this.data[parent]] = [this.data[parent], this.data[index]];
            index = parent;
        }
    }
    bubbleDown(index) {
        const n = this.data.length;
        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let smallest = index;
            if (left < n && this.compare(this.data[left], this.data[smallest]) < 0) {
                smallest = left;
            }
            if (right < n && this.compare(this.data[right], this.data[smallest]) < 0) {
                smallest = right;
            }
            if (smallest === index)
                break;
            [this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]];
            index = smallest;
        }
    }
}
exports.MinHeap = MinHeap;
