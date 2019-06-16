
var jwt = require('jsonwebtoken');

class Jwt {
    constructor() {
    }

    TOKEN_EXPIRY_TIME = 1440;
    signIn = (data) => {
        return new Promise((resolve, rejects)=>{
            let token = jwt.sign(JSON.parse(JSON.stringify(data)), process.env.SECRET_KEY, {
                expiresIn: this.TOKEN_EXPIRY_TIME
            });
            resolve(token);
        })
    }

    verifyToken = (token) => {
        return new Promise((resolve, rejects)=>{
            jwt.verify(token, process.env.SECRET_KEY, function(err, data) {
                if(err) {
                    console.log("err :",err)
                    resolve(false);
                } else {
                    //console.log(data);
                    resolve(true);
                }
            })
        })
    }

}

export default new Jwt();