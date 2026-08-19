import { Redis } from "ioredis"

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379"
const redis = new Redis(redisUrl);

redis.on("connect", () => {
    console.log("Redis connected")
})

export default redis