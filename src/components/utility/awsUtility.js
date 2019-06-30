import AWS from 'aws-sdk';
 const BUCKET_NAME = "betterworldimage";
// const IAM_USER_KEY = process.env.AWS_ACCESS_KEY;
// const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;
AWS.config.update({ region: 'us-east-1' });
let s3 = new AWS.S3();
var uploadToS3= function(imageData, filename){
    return new Promise((resolve, rejects)=>{
        let encodedImage = imageData;
        let decodedImage = Buffer.from(encodedImage, 'base64');
        let filePath = "user/flat/" + filename
    
        let params = {
            "Body": decodedImage,
            "Bucket": BUCKET_NAME,
            "Key": filePath
        };
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


export default {
    uploadToS3, getS3Image
}