"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topKPriorityNotifications = topKPriorityNotifications;
const MinHeap_1 = require("../heap/MinHeap");
const priorityRankingService_1 = require("./priorityRankingService");
function topKPriorityNotifications(notifications, k, nowMs = Date.now()) {
    // Min-heap by score (smallest score at top)
    const heap = new MinHeap_1.MinHeap((a, b) => a.score - b.score);
    for (const n of notifications) {
        const score = (0, priorityRankingService_1.computePriorityScore)(n, nowMs);
        const entry = { notification: n, score };
        if (heap.size() < k) {
            heap.push(entry);
        }
        else {
            const min = heap.peek();
            if (min && entry.score > min.score) {
                heap.pop();
                heap.push(entry);
            }
        }
    }
    // heap contains top-k but unsorted; sort descending for output
    return heap.toArray().sort((a, b) => b.score - a.score);
}
