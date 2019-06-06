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


    getResponseObject(type, code, message, data) {
        let resObject = {
            statusCode: code,
            body: JSON.stringify({
                message:message,
                data : data,
                type: type
            }, null, 2),
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"*"
            }
        };
        return resObject;
    }
}

export default new ResponseFormat();