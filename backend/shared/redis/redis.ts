import { Redis } from "ioredis"

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379"

let lastWarningTime = 0;

const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: true,
    retryStrategy(times) {
        // Retry every 5 seconds if disconnected
        return Math.min(times * 1000, 5000);
    },
});

redis.on("connect", () => {
    console.log("Redis connected successfully")
})

redis.on("error", (err: any) => {
    const now = Date.now();
    // Throttle warning log to once every 10 seconds to avoid console spam
    if (now - lastWarningTime > 10000) {
        lastWarningTime = now;
        if (err.code === "ECONNREFUSED") {
            console.warn("⚠️ Redis connection refused (localhost:6379). Please start Redis or Docker container (`docker compose up -d`).");
        } else {
            console.error("Redis error:", err.message || err);
        }
    }
})

export default redis