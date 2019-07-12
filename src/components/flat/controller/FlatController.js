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

    uploadFileOnS3 = async (req, res) => {
        try {

            var form = new multiparty.Form();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.log(`ListingValidation : saveDocument :: ${JSON.stringify(err)}`);
                    res.status(responseFormat.statusCode["BAD_REQUEST"]).send(responseFormat.getResponseObject("error", responseFormat.statusCode["BAD_REQUEST"], " Multiparty data format not match", err));
    
                } 

                // let parsedFileObject = JSON.parse(fields.fileInfo[0]);
                // console.log("This else fields ", parsedFileObject);
                // let fileDecriptionArray = parsedFileObject.fileArray;
                // let externalDetails = parsedFileObject.externalFileDetails;
                // let flatId = externalDetails.flatId
                let fileObject = files
                
                console.log("This else files ", JSON.stringify(fileObject));
                // let s3ResponsePromiseArray = [];
                // let dbResponsePromiseArray =[];
                // fileDecriptionArray.forEach((fieldDescription)=>{
                //     console.log("&&&&&&");
                //     console.log("**********",fileObject[fieldDescription.file_name]);
                //     let fileName = "Owner-"+req.body.senderInfo.ownerid+"-Flat-"+flatId+"--"+fieldDescription.doc_name+"."+fieldDescription.file_name.split(".")[1];
                //     let result = awsUtility.uploadToS3(fileObject[fieldDescription.file_name][0], fileName);
                //     s3ResponsePromiseArray.push(result);
                // })
               // if(req.body.flatId) {
                   // let flatId = req.body.flatId;
                    console.log("FlatController :: uploadFileOnS3");
                // let s3ResponsePromiseArray = [];
                // let dbResponsePromiseArray =[];


    
                // files.forEach((data)=>{
                //     let base64String = data.base64ImageData.split(',').pop();
                //     data.fileName = "Owner-"+req.body.senderInfo.ownerid+"-Flat-"+flatId+"-"+data.fileName
                //     let result = awsUtility.uploadToS3(base64String, data.fileName);
                //     s3ResponsePromiseArray.push(result);
                // })
    
                // let s3ResponseArr = await Promise.all(s3ResponsePromiseArray);
                // console.log("******s3ResponseArr******",s3ResponseArr);
                // s3ResponseArr.forEach((data)=>{
                //     data.flatId = flatId;
                //     let result = this.insertFlatFiles(data);
                //     dbResponsePromiseArray.push(result);
                // })
                // let dbResponseArr = await Promise.all(dbResponsePromiseArray);
                // console.log("******dbResponseArr******",dbResponseArr);
                res.status(responseFormat.statusCode["SUCCESS"]).json(responseFormat.getExpressResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", "All Ok"));
                // } else {
                //     throw new Error("Please provide Flat Id");
                // }
    
            });

            
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