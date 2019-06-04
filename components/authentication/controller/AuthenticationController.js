import authenticationModel from "../model/AuthenticationModel"
import bcrypt from '../../../lib/bcrypt'
import jwt from '../../../lib/jwt'

class AuthenticationController {
    constructor(){
        console.log("inside AuthenticationController");
         
    }

    loginUser = async (body) => {
        try {
            console.log("AuthenticationController :: loginUser");
            let result = await authenticationModel.loginUser(body);
            if(result) {
                let isPasswordMatch = await bcrypt.comparePassword(body.password, result.password);
                if(isPasswordMatch) {
                    delete result.password;
                    let signInToken = await jwt.signIn(result);
                    return signInToken;
                } else {
                    throw new Error("Invalid Password!!");
                }
            } else {
                throw new Error("Invalid Email!!");
            }
        } catch(err) {
            console.log("AuthenticationController :: loginUser :: Error", err);
            throw new Error(err);
        } 
    } 

}

export default new AuthenticationController();