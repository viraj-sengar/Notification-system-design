"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const priorityInboxService_1 = require("../src/services/priorityInboxService");
describe('Priority Inbox', () => {
    test('returns top K by weight + recency', () => {
        const now = Date.now();
        const n = [
            { id: '1', type: 'event', title: 'E old', body: '', createdAt: new Date(now - 10 * 3600_000).toISOString() },
            { id: '2', type: 'result', title: 'R recent', body: '', createdAt: new Date(now - 1 * 3600_000).toISOString() },
            { id: '3', type: 'placement', title: 'P old', body: '', createdAt: new Date(now - 20 * 3600_000).toISOString() }
        ];
        const top = (0, priorityInboxService_1.topKPriorityNotifications)(n, 2, now);
        expect(top.length).toBe(2);
        // placement weight should generally win even with decay
        expect(top[0].notification.type === 'placement' || top[0].notification.type === 'result').toBe(true);
    });
});
