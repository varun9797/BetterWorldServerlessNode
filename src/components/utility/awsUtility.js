import AWS from 'aws-sdk';
import fs from "fs";
 const BUCKET_NAME = "betterworldimage";
 import mime from "mime-types";
 import path from "path";
// const IAM_USER_KEY = process.env.AWS_ACCESS_KEY;
// const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.update({ region: 'us-east-1' });
let s3 = new AWS.S3();
var uploadToS3= function(fileObject, filename){
    return new Promise((resolve, rejects)=>{
        //let encodedImage = imageData;
        //let decodedImage = Buffer.from(encodedImage, 'base64');
        let filePath = "user/flat/" + filename
        
        let params = {
            "Body": fs.createReadStream(fileObject.path),
            "Bucket": BUCKET_NAME,
            "Key": filePath,
            "ContentType": mime.contentType(path.extname(filePath)) || ""
        };
        console.log("*path is ---", params);
        s3.upload(params, function (err, data) {
            if (err) {
                console.log("awsUtility :: uploadToS3 :: Error", err);
                rejects(err);
            } else {
                console.log("awsUtility :: uploadToS3 ", data);
                resolve(data);
            }
        });
    })
};

var getS3Image = function (body) {
    return new Promise((resolve, rejects) => {
        var params = { Bucket: BUCKET_NAME, Key: body.fileId };
        console.log("params are", params);
        s3.getObject(params
            , function (err, data) {
            if (err) {
                console.log("awsUtility :: getS3Image :: Error", err);
                rejects(err);
            } else {
                resolve(data)

            }
        });
    })

}

var getS3SignedUrl = function (body) {
    return new Promise((resolve, rejects) => {
        var params = { Bucket: BUCKET_NAME, Key: body.s3Key , ContentType:body.contentType };
        let fileurls =[];
        let type = 'putObject';
        if(body.type = 'get'){
            type = 'getObject'
        }
        console.log("params are", params);
        s3.getSignedUrl('putObject', params, function (err, url){
            if(err){
             console.log('Error getting presigned url from AWS S3');
             rejects({  message : 'Pre-Signed URL error '+  err});
             }
             else{
             fileurls[0] = url;
             console.log('Presigned URL: ', fileurls[0]);
             resolve( {urls : fileurls})
             }
            });
    })

}

export default {
    uploadToS3, getS3Image, getS3SignedUrl
}