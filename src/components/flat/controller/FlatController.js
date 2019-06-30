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

    insertFlatImages = async (data) => {
        try {
            console.log("FlatController :: insertFlatImages");
            let result = await flatModel.insertFlatImages(data);
            return result;
           // res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result));
        } catch(err) {
            console.log("FlatController :: insertFlatImages :: Error", err);
            throw new Error(err)
            //res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    }

    uploadFileOnS3 = async (req, res) => {
        try {
            if(req.body.flatId) {
                let flatId = req.body.flatId;
                console.log("FlatController :: uploadFileOnS3");
            let s3ResponsePromiseArray = [];
            let dbResponsePromiseArray =[];

            req.body.fileDetailArray.forEach((data)=>{
                let base64String = data.base64ImageData.split(',').pop();
                let result = awsUtility.uploadToS3(base64String, data.fileName);
                s3ResponsePromiseArray.push(result);
            })

            let s3ResponseArr = await Promise.all(s3ResponsePromiseArray);
            console.log("******s3ResponseArr******",s3ResponseArr);
            s3ResponseArr.forEach((data)=>{
                data.flatId = flatId;
                let result = this.insertFlatImages(data);
                dbResponsePromiseArray.push(result);
            })
            let dbResponseArr = await Promise.all(dbResponsePromiseArray);
            console.log("******dbResponseArr******",dbResponseArr);
            res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", dbResponseArr));
            } else {
                throw new Error("Please provide Flat Id");
            }
            
        } catch(err) {
            console.log("FlatController :: uploadFileOnS3 :: Error", err);

            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    } 

    getFileFromS3 = async (req, res) => {
        try {
            console.log("FlatController :: uploadFileOnS3");
            let result = await awsUtility.getS3Image(req.query, res);
            console.log(result);
            var base64data = new Buffer(result.Body).toString('base64');
            res.send(base64data);  
        } catch(err) {
            console.log("FlatController :: uploadFileOnS3 :: Error", err);

            res.status(responseFormat.statusCode["INTERNAL_SERVER_ERROR"]).json(responseFormat.getExpressResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message));
        } 
    }  
}

export default new FlatController();