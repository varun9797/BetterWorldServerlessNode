const authenticationModel =require( "../model/AuthenticationModel");
const bcrypt =require ( '../../../../lib/bcrypt');
const jwt = require( '../../../../lib/jwt');
import responseFormat from "../../../../lib/response-format";
const jwt_decode = require('jwt-decode');


// class AuthenticationController {
//     constructor(){
//         console.log("inside AuthenticationController");
         
//     }

    export  async  function loginUser (req, res) {
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

    export  async  function verifyTokenApi (req, res){
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

    export  async  function verifyTokenMiddleware  (req, res, next) {
        try {
            console.log("AuthenticationController :: verifyToken");
            var token = req.body.token || req.headers["x-access-token"];
            if(token) {
               let result = await jwt.verifyToken(token);
                    if (!result) {
                        res.status(responseFormat.statusCode["BAD_REQUEST"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], "Token is invalid", null));
                    } else {
                        if(req.body){
                            req.body.senderInfo = decodeJwt(token);
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

    function decodeJwt (token) {
        var decoded = jwt_decode(token);
        console.log(decoded);
    
        return decoded;
    };
//}

//export default new AuthenticationController();