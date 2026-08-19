import ApiError from "../utils/apiError.js";
import ApiResponse, { MinimalResponse } from "../utils/apiResponse.js";

export const globalErrorHandler = (
    err: any,
    _req: any,
    res: MinimalResponse,
    _next: any
) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = err.errors || [];

    if (!(err instanceof ApiError)) {
        console.error("Unhandled Error:", err);
    }

    return ApiResponse.error(res, message, statusCode, errors);
};

export default globalErrorHandler;
