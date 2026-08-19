export class ApiError extends Error {
    public statusCode: number;
    public errors: any[];

    constructor(
        statusCode: number = 500,
        message: string = "Internal Server Error",
        errors: any[] = []
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string = "Bad Request", errors: any[] = []) {
        return new ApiError(400, message, errors);
    }

    static unauthorized(message: string = "Unauthorized access") {
        return new ApiError(401, message);
    }

    static forbidden(message: string = "Access forbidden") {
        return new ApiError(403, message);
    }

    static notFound(message: string = "Resource not found") {
        return new ApiError(404, message);
    }

    static internal(message: string = "Internal server error") {
        return new ApiError(500, message);
    }
}

export default ApiError;
