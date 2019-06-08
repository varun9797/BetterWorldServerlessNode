class ResponseFormat {
    constructor() {
        this.statusCode = {
            SUCCESS: 200,
            CREATED: 201,
            NO_CONTENT: 204,
            CONFLICT: 409,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            PRECONDITION_FAILED: 412,
            NOT_FOUND: 404,
            INTERNAL_SERVER_ERROR: 500,
            SERVICE_UNAVAILABLE: 503,
            UNPROCESSABLE_ENTITY: 422
        };
    }


    getLambdaResponseObject(type, code, message, data) {
        let resObject = {
            statusCode: code,
            body: JSON.stringify({
                message:message,
                data : data,
                type: type
            }, null, 2),
            headers:{
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials' : true,
                'Content-Type': 'application/json'
            }
        };
        return resObject;
    }

    getExpressResponseObject(type, code, message, data) {
        let resObject = {
            statusCode: code,
            body: {
                message:message,
                data : data,
                type: type
            }
        };
        return resObject;
    }
}

export default new ResponseFormat();