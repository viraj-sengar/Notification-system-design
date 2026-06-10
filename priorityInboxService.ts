import { MinHeap } from '../heap/MinHeap';
import { Notification } from '../models/notification';
import { computePriorityScore, ScoredNotification } from './priorityRankingService';

export function topKPriorityNotifications(
  notifications: Notification[],
  k: number,
  nowMs = Date.now()
): ScoredNotification[] {
  // Min-heap by score (smallest score at top)
  const heap = new MinHeap<ScoredNotification>((a, b) => a.score - b.score);

  for (const n of notifications) {
    const score = computePriorityScore(n, nowMs);
    const entry: ScoredNotification = { notification: n, score };

    if (heap.size() < k) {
      heap.push(entry);
    } else {
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

