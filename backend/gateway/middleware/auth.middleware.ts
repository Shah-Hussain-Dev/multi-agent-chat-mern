import { NextFunction, Request, Response } from "express";
import ApiError from "../../shared/utils/apiError.js";
import redis from "../../shared/redis/redis.js";

const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get session id from cookies
        const sessionId = req.cookies?.session_id || req.cookies?.session;
        if (!sessionId) {
            return res.status(401).json({ success: false, message: "Unauthorized access!" });
        }
        // get user from cache (redis)
        const session = await redis.get(`session-${sessionId}`)
        if (!session) {
            return ApiError.unauthorized("Session expired!")
        }
        // add user to request
        (req as any).user = JSON.parse(session)
        next()

    } catch (error) {
        console.log("Error in auth middleware", error)
        return ApiError.internal(`Internal server error ${error}`)
    }
}

export default protect  