"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computePriorityScore = computePriorityScore;
const time_1 = require("../utils/time");
const priorities_1 = require("../types/priorities");
// Weight + recency factor
// PriorityScore = weight + recencyFactor
// recencyFactor decays with age: recencyFactor = 30 / (1 + hours)
// Tunable constants keep score bounded and stable.
function computePriorityScore(n, nowMs = Date.now()) {
    const type = n.type;
    const weight = priorities_1.PRIORITY_WEIGHTS[type] ?? 0;
    const hours = (0, time_1.ageHours)(n.createdAt, nowMs);
    const recencyFactor = 30 / (1 + hours);
    return weight + recencyFactor;
}
