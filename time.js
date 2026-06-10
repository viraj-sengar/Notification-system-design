"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ageHours = ageHours;
function ageHours(iso, nowMs = Date.now()) {
    const t = Date.parse(iso);
    if (Number.isNaN(t))
        return Number.POSITIVE_INFINITY;
    return (nowMs - t) / (1000 * 60 * 60);
}
