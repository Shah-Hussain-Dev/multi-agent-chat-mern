import proxy from "express-http-proxy"

// proxy request to other services with user id header
export const proxyWithHeader = (serviceUrl: string) => {
    return proxy(serviceUrl, {
        // modify request options before sending to target service
        proxyReqOptDecorator: (proxyReqOpts, srcReq: any) => {
            // add user id to request headers
            if (srcReq.user) {
                proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
            }

            return proxyReqOpts;
        }
    })
}