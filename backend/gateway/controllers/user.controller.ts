import { Request, Response } from "express";
import ApiError from "../../shared/utils/apiError.js";
import ApiResponse from "../../shared/utils/apiResponse.js";

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        return ApiResponse.success(res, "User fetched successfully", {
            user: (req as any).user
        });
    } catch (error) {
        console.log("Error in getCurrentUser", error)
        return ApiError.internal(`Internal server error ${error}`)
    }
}

export default getCurrentUser