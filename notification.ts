import { NotificationType } from '../types/priorities';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  actionUrl?: string | null;
  createdAt: string; // ISO
  isRead?: boolean;
  readAt?: string | null;
  metadata?: Record<string, unknown>;
}

