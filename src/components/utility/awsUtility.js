import AWS from 'aws-sdk';
 const BUCKET_NAME = "betterworldimage";



AWS.config.update({ region: 'us-east-1' });
let s3 = new AWS.S3();
var uploadToS3= function(imageData){
    return new Promise((resolve, rejects)=>{
        let encodedImage = imageData;
        let decodedImage = Buffer.from(encodedImage, 'base64');
        let filePath = "user/flat/" + "test" + ".png"
    
        let params = {
            "Body": decodedImage,
            "Bucket": BUCKET_NAME,
            "Key": filePath,
            "ContentType ": "mime/png"
        };
        s3.upload(params, function (err, data) {
            if (err) {
                console.log("awsUtility :: uploadToS3 :: Error", err);
                rejects(err);
                //return err;
            } else {
                console.log("awsUtility :: uploadToS3 ", data);
                resolve(data)
                //return data;
            }
        });
    })
};

var getS3Image = function (body) {
    return new Promise((resolve, rejects) => {
        var params = { Bucket: BUCKET_NAME, Key: body.imageId };
        console.log("params are", params);
        s3.getObject(params, function (err, data) {
            if (err) {
                console.log("awsUtility :: getS3Image :: Error", err);
                rejects(err);
            } else {
                resolve(data.Body);
                //res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                //res.write(data.Body, 'binary');
                //res.end(null, 'binary');
            }
        });
    })

}


export default {
    uploadToS3, getS3Image
}