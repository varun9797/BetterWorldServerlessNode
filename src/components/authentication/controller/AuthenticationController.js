import authenticationModel from "../model/AuthenticationModel";
import bcrypt from '../../../../lib/bcrypt';
import jwt from '../../../../lib/jwt';
import responseFormat from "../../../../lib/response-format";
import jwt_decode from 'jwt-decode';


class AuthenticationController {
    constructor(){
        console.log("inside AuthenticationController");
         
    }

    loginUser = async (req, res) => {
        try {
            let body = req.body;
            console.log("AuthenticationController :: loginUser");
            let result = await authenticationModel.loginUser(body);
            if(result) {
                let isPasswordMatch = await bcrypt.comparePassword(body.password, result.password);
                if(isPasswordMatch) {
                    delete result.password;
                    let signInToken = await jwt.signIn(result);
                    res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", signInToken));
                } else {
                    res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], "Invalid Password!", null));
                }
            } else {
                res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], "Invalid Email!", null));
            }
        } catch(err) {
            console.log("AuthenticationController :: loginUser :: Error", err);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err));
        } 
    } 

    verifyTokenApi = async (req, res) => {
        try {
            console.log("AuthenticationController :: verifyToken");
            var token = req.body.token || req.headers["x-access-token"];
            if(token) {
               let result = await jwt.verifyToken(token);
                    if (!result) {
                        res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], "Token is invalid", null));
                    } else {
                        res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "valid token"));
                    }
            } else {
                res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], "Please send the token", null));
            }
        } catch(err) {
            console.log("AuthenticationController :: verifyToken :: Error", err);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err));
        } 
    }

    verifyTokenMiddleware = async (req, res, next) => {
        try {
            console.log("AuthenticationController :: verifyToken");
            var token = req.body.token || req.headers["x-access-token"];
            if(token) {
               let result = await jwt.verifyToken(token);
                    if (!result) {
                        res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], "Token is invalid", null));
                    } else {
                        if(req.body){
                            req.body.senderInfo = this.decodeJwt(token);
                        }
                        
                        next()
                    }
            } else {
                res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], "Please send the token", null));
            }
        } catch(err) {
            console.log("AuthenticationController :: verifyToken :: Error", err);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err));
        } 
    }

    decodeJwt (token) {
        var decoded = jwt_decode(token);
        console.log(decoded);
    
        return decoded;
    };
}

export default new AuthenticationController();