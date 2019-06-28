import flatModel from "../model/FlatModel"
import responseFormat from "../../../../lib/response-format"
import awsUtility from "../../utility/awsUtility";

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

    uploadFileOnS3 = async (req, res) => {
        try {
            console.log("FlatController :: uploadFileOnS3");
            let result = await awsUtility.uploadToS3(req.body.image);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("FlatController :: uploadFileOnS3 :: Error", err);

            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    } 

    getFileFromS3 = async (req, res) => {
        try {
            console.log("FlatController :: uploadFileOnS3");
            let result = await awsUtility.getS3Image(req.query);
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.write(result, 'binary');
            res.end(null, 'binary');
            // console.log("***********");
            // res.download(result);
            //res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("FlatController :: uploadFileOnS3 :: Error", err);

            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    } 

    // getFlatsByOwnerId = async (req, res) => {
    //     try {
    //         let body = req.query;
    //         console.log("FlatController :: getFlatsByOwnerId");
    //         let result = await flatModel.getFlatsByOwnerId(body);
    //         res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
    //     } catch(err) {
    //         console.log("FlatController :: getFlatsByOwnerId :: Error", err);
    //         res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
    //     } 
    // } 

    // getFlatsBySocietyId = async (req, res) => {
    //     try {
    //         let body = req.query;
    //         console.log("FlatController :: getFlatsBySocietyId");
    //         let result = await flatModel.getFlatsBySocietyId(body);
    //         res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
    //     } catch(err) {
    //         console.log("FlatController :: getFlatsBySocietyId :: Error", err);
    //         res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
    //     } 
    // } 

}

export default new FlatController();