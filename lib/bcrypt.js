

const bcrypt = require('bcrypt');
const saltRounds = 10;

class Bcrypt {
    constructor() {
    }


    bcryptPassword = (plaintextPassword) => {
        return new Promise((resolve, rejects)=>{
            bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
                if(err){
                    rejects(err);
                }
                resolve(hash);
              });
        })
    }

    comparePassword = (plaintextPassword, hash) => {
        return new Promise((resolve, rejects)=>{
            bcrypt.compare(plaintextPassword, hash, function(err, res) {
                if(err){
                    rejects(err)
                }
                if(res){
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        })
    }

}

export default new Bcrypt();