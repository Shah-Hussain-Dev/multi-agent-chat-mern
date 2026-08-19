# Shared API Utilities & Standardization Guide

This directory contains shared response helpers, custom error classes, and middleware for maintaining consistent API output formats across all backend microservices.

---

## 1. Response Structure Standard

Every API response emitted by Express microservices adheres to a unified format:

### Success Response (`2xx`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "_id": "66c1e5...",
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "timestamp": "2026-08-18T21:47:20.000Z"
}
```

### Error Response (`4xx` / `5xx`)
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid email or password",
  "errors": [],
  "timestamp": "2026-08-18T21:47:20.000Z"
}
```

---

## 2. `ApiResponse` Usage Examples

Import `ApiResponse` from `shared/utils/apiResponse.js`:

```typescript
import ApiResponse from "../../../shared/utils/apiResponse.js";
```

### A. Success Responses (`ApiResponse.success`)
```typescript
// Simple Success Message
return ApiResponse.success(res, "Password reset link sent");

// Success with Data (Default 200 OK)
return ApiResponse.success(res, "User profile retrieved", user);

// Success with Custom Status Code (e.g. 201 Created)
return ApiResponse.success(res, "Account created successfully", newUser, 201);
```

### B. Error Responses (`ApiResponse.error`)
```typescript
// Bad Request (400)
return ApiResponse.error(res, "Email and password are required", 400);

// Unauthorized (401)
return ApiResponse.error(res, "Invalid authentication credentials", 401);

// Internal Server Error with Detailed Validation Errors (500)
return ApiResponse.error(res, "Validation failed", 422, [
  "Password must be at least 6 characters",
  "Invalid email format"
]);
```

### C. Custom Payload Responses (`ApiResponse.custom`)
Useful for responses requiring metadata like pagination:

```typescript
return ApiResponse.custom(res, {
  success: true,
  statusCode: 200,
  message: "Paginated users fetched",
  data: users,
  meta: {
    page: 1,
    limit: 10,
    totalRecords: 45
  }
});
```

---

## 3. `ApiError` Class Usage

Import `ApiError` from `shared/utils/apiError.js`:

```typescript
import ApiError from "../../../shared/utils/apiError.js";
```

Throw pre-formatted operational errors in services or controllers:

```typescript
// Throw specific HTTP status errors
throw ApiError.badRequest("Invalid email format");
throw ApiError.unauthorized("Session expired");
throw ApiError.notFound("User not found");

// Throw custom status error
throw new ApiError(409, "User email already exists");
```

---

## 4. Global Error Handler Middleware

Attach `globalErrorHandler` to your Express app:

```typescript
import express from "express";
import globalErrorHandler from "./shared/middleware/errorHandler.js";

const app = express();

// ... your routes ...

// Global Error Middleware (place after all routes)
app.use(globalErrorHandler);
```
