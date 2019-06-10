import authenticationModel from "../model/AuthenticationModel";
import bcrypt from '../../../../lib/bcrypt';
import jwt from '../../../../lib/jwt';
import responseFormat from "../../../../lib/response-format";


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
                    res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Invalid Password!", null));
                }
            } else {
                res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Invalid Email!", null));
            }
        } catch(err) {
            console.log("AuthenticationController :: loginUser :: Error", err);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err));
        } 
    } 

    verifyTokenApi = async (req, res) => {
        try {
            console.log("AuthenticationController :: verifyToken");
            var token = req.body.token || req.headers['token'];
            if(token) {
                jwt.verify(token, process.env.SECRET_KEY, function(err, data) {
                    if (err) {
                        res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Token is invalid", null));
                    } else {
                        res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "valid token"));
                    }
                })
            } else {
                res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Please send the token", null));
            }
        } catch(err) {
            console.log("AuthenticationController :: verifyToken :: Error", err);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err));
        } 
    }

    verifyTokenMiddleware = async (req, res, next) => {
        try {
            console.log("AuthenticationController :: verifyToken");
            var token = req.body.token || req.headers['token'];
            if(token) {
                jwt.verify(token, process.env.SECRET_KEY, function(err, data) {
                    if (err) {
                        res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Token is invalid", null));
                    } else {
                        next();
                    }
                })
            } else {
                res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Please send the token", null));
            }
        } catch(err) {
            console.log("AuthenticationController :: verifyToken :: Error", err);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err));
        } 
    }
}

export default new AuthenticationController();