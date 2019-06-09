import flatModel from "../model/FlatModel"
import responseFormat from "../../../../lib/response-format"

class FlatController {
    constructor(){
        console.log("inside FlatController");
         
    }

    getFlatsByOwnerId = async (req, res) => {
        try {
            let body = req.query;
            console.log("FlatController :: getFlatsByOwnerId");
            let result = await flatModel.getFlatsByOwnerId(body);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("FlatController :: getFlatsByOwnerId :: Error", err);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    } 

}

export default new FlatController();