import ownerModel from "./../model/OwnerModel";
import bcrypt from "../../../../lib/bcrypt";
import responseFormat from "../../../../lib/response-format";

class OwnerController {
    constructor(){
        console.log("inside OwnerController");
         
    }

    registerOwner = async (req, res) => {
        try {
            console.log("OwnerController :: registerOwner");
            let body = req.body;
            body.password =  await bcrypt.bcryptPassword(body.password);
            let result = await ownerModel.registerOwner(body);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("OwnerController :: registerOwner :: Error", err);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!!", err.message));
        } 
    } 

    getOwnerDetails = async (req, res) => {
        try {
            console.log("OwnerController :: getOwnerDetails");
            let body = req.query;
            let result = await ownerModel.getOwnerDetails(body);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("OwnerController :: getOwnerDetails :: Error", err);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    } 

    updateOwnerDetails  = async (req, res) => {
        try {
            console.log("OwnerController :: updateOwnerDetails");
            let body = req.body;
            body.ownerId = req.query.ownerId;
            let result = await ownerModel.updateOwnerDetails(body);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("OwnerController :: updateOwnerDetails :: Error", err);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    } 
}

export default new OwnerController();