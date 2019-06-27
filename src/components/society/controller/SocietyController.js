import SocietyModel from "../model/SocietyModel";
import responseFormat from "../../../../lib/response-format";

class SocietyController {
    constructor(){
        console.log("inside SocietyController");
         
    }

    getSocietyBySocietyId = async (req, res) => {
        try {
            let body = req.query;
            console.log("SocietyController :: getSocietyBySocietyId");
            //let result = await googleUtility.urlGoogle();
            //result = await googleUtility.getGoogleAccountFromCode(result);
            let result = await SocietyModel.getSocietyBySocietyId(body);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("SocietyController :: getSocietyBySocietyId :: Error", err);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!!", err.message));
        } 
    } 

    getSocietyByOwnerId = async (req, res) => {
        try {
            let body = req.query;
            console.log("SocietyController :: getSocietyByOwnerId");
            let result = await SocietyModel.getSocietyByOwnerId(body);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("SocietyController :: getSocietyByOwnerId :: Error", err);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!!", err.message));
        } 
    } 
}

export default new SocietyController();