"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNotifications = fetchNotifications;
const node_fetch_1 = __importDefault(require("node-fetch"));
const BASE_URL = 'http://4.224.186.213';
const PATH = '/evaluation-service/notifications';
function coerceToNotifications(payload) {
    if (!payload)
        return [];
    const obj = payload;
    return (obj.items ?? obj.notifications ?? obj.data ?? []);
}
async function fetchNotifications() {
    // If the upstream API requires auth, pass it via env:
    // NOTIFICATION_API_AUTH="Bearer <token>"
    const auth = process.env.NOTIFICATION_API_AUTH;
    const res = await (0, node_fetch_1.default)(`${BASE_URL}${PATH}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            ...(auth ? { Authorization: auth } : {})
        }
    });
    if (!res.ok) {
        // For local/offline dev: allow an env-based mock dataset.
        // NOTIFICATION_MOCK=1
        if (process.env.NOTIFICATION_MOCK === '1')
            return getMockNotifications();
        throw new Error(`Failed to fetch notifications: ${res.status} ${res.statusText}`);
    }
    const json = (await res.json());
    return coerceToNotifications(json);
}
function getMockNotifications() {
    const now = Date.now();
    return [
        {
            id: 'n1',
            type: 'placement',
            title: 'Placement update',
            body: 'Placement schedule updated',
            actionUrl: null,
            createdAt: new Date(now - 2 * 3600_000).toISOString(),
            isRead: false
        },
        {
            id: 'n2',
            type: 'result',
            title: 'Result declared',
            body: 'Your results are available',
            actionUrl: null,
            createdAt: new Date(now - 8 * 3600_000).toISOString(),
            isRead: false
        },
        {
            id: 'n3',
            type: 'event',
            title: 'Event reminder',
            body: 'Join the webinar',
            actionUrl: null,
            createdAt: new Date(now - 1 * 3600_000).toISOString(),
            isRead: false
        }
    ];
}
