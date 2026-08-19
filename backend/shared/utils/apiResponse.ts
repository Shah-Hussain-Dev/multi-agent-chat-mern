export interface IApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    errors?: any[];
    timestamp: string;
}

export interface MinimalResponse {
    status(code: number): this;
    json(body: any): any;
}

export class ApiResponse {
    /**
     * Send a standardized success response
     */
    static success<T>(
        res: MinimalResponse,
        message: string = "Success",
        data?: T,
        statusCode: number = 200
    ) {
        return res.status(statusCode).json({
            success: true,
            statusCode,
            message,
            data,
            timestamp: new Date().toISOString(),
        });
    }

    /**
     * Send a standardized error response
     */
    static error(
        res: MinimalResponse,
        message: string = "An error occurred",
        statusCode: number = 500,
        errors: any[] = []
    ) {
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message,
            errors,
            timestamp: new Date().toISOString(),
        });
    }

    /**
     * Send a custom formatted response
     */
    static custom<T>(
        res: MinimalResponse,
        payload: {
            success: boolean;
            statusCode: number;
            message: string;
            data?: T;
            errors?: any[];
            meta?: Record<string, any>;
        }
    ) {
        const { success, statusCode, message, data, errors, meta } = payload;
        return res.status(statusCode).json({
            success,
            statusCode,
            message,
            ...(data !== undefined && { data }),
            ...(errors && errors.length > 0 && { errors }),
            ...(meta && { meta }),
            timestamp: new Date().toISOString(),
        });
    }
}

export default ApiResponse;
