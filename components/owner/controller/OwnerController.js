import ownerModel from "./../model/OwnerModel"
//import bcrypt from '../../../lib/bcrypt'
import responseFormat from "../../../lib/response-format"

class OwnerController {
    constructor(){
        console.log("inside OwnerController");
         
    }

    // registerOwner = async (req, res) => {
    //     try {
    //         console.log("SocietyController :: registerOwner");
    //         let body = req.body;
    //         body.password =  await bcrypt.bcryptPassword(body.password);
    //         let result = await ownerModel.registerOwner(body);
    //         res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
    //     } catch(err) {
    //         console.log("SocietyController :: registerOwner :: Error", err);
    //         res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
    //     } 
    // } 

    getOwnerDetails = async (req, res) => {
        try {
            console.log("SocietyController :: getOwnerDetails");
            let body = req.query;
            let result = await ownerModel.getOwnerDetails(body);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("SocietyController :: getOwnerDetails :: Error", err);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    } 
}

export default new OwnerController();