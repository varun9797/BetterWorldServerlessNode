import flatModel from "../model/FlatModel"
import responseFormat from "../../../../lib/response-format"
import awsUtility from "../../utility/awsUtility";
import multiparty from "multiparty";
class FlatController {
    constructor(){
        console.log("inside FlatController");
         
    }

    getFlats = async (req, res) => {
        try {
            let body = req.query;
            console.log("FlatController :: getFlatsByOwnerId");
            let result = await flatModel.getFlats(body);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("FlatController :: getFlatsByOwnerId :: Error", err);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    } 

    updateFlat = async (req, res) => {
        try {
            console.log("FlatController :: updateFlat");
            let result = await flatModel.updateFlatDetails(req.body);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("FlatController :: updateFlat :: Error", err);

            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    }

    insertFlatFiles = async (data) => {
        try {
            console.log("FlatController :: insertFlatFiles");
            let result = await flatModel.insertFlatFiles(data);
            return result;
           // res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("FlatController :: insertFlatFiles :: Error", err);
            throw new Error(err)
            //res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    }

    getS3SignedUrl = async (req, res) => {
        try {
            console.log("FlatController :: getS3SignedUrl");
            req.body.s3Key = `user/flat/${req.body.uniqueFolder}/${req.body.fileName}`;
            req.body.bucket = "betterworldimage";
            await this.insertFlatFiles(req.body);
            let signedUrlResponse = await awsUtility.getS3SignedUrl(req.body);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", signedUrlResponse));
        } catch(err) {
            console.log("FlatController :: uploadFileOnS3 :: Error", err);
            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    } 

    getFileFromS3 = async (req, res) => {
        try {
            console.log("FlatController :: uploadFileOnS3");
            let result = await awsUtility.getS3Image(req.query);
            //console.log(result);
            var base64data = new Buffer(result.Body).toString('base64');
            res.send(base64data);  
        } catch(err) {
            console.log("FlatController :: uploadFileOnS3 :: Error", err);

            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    }  
}

export default new FlatController();