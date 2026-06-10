import fetch from 'node-fetch';
import { Notification } from '../models/notification';

const BASE_URL = 'http://4.224.186.213';
const PATH = '/evaluation-service/notifications';

type ApiResponse = {
  items?: Notification[];
  notifications?: Notification[];
  data?: Notification[];
};

function coerceToNotifications(payload: unknown): Notification[] {
  if (!payload) return [];
  const obj = payload as ApiResponse;
  return (obj.items ?? obj.notifications ?? obj.data ?? []) as Notification[];
}

export async function fetchNotifications(): Promise<Notification[]> {
  // If the upstream API requires auth, pass it via env:
  // NOTIFICATION_API_AUTH="Bearer <token>"
  const auth = process.env.NOTIFICATION_API_AUTH;

  const res = await fetch(`${BASE_URL}${PATH}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...(auth ? { Authorization: auth } : {})
    }
  });

  if (!res.ok) {
    // For local/offline dev: allow an env-based mock dataset.
    // NOTIFICATION_MOCK=1
    if (process.env.NOTIFICATION_MOCK === '1') return getMockNotifications();
    throw new Error(`Failed to fetch notifications: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as unknown;
  return coerceToNotifications(json);
}

function getMockNotifications(): Notification[] {
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


