

const bcrypt = require('bcryptjs');
const saltRounds = 10;

// class Bcrypt {
//     constructor() {
//     }


    export async function  bcryptPassword  (plaintextPassword) {
        try {
            var hash = bcrypt.hashSync(plaintextPassword, saltRounds);
            return hash;
        } catch (err){
            throw new Error(err);
        }
    }

    export async function comparePassword (plaintextPassword, hash) {
        try {
            let res = await bcrypt.compare(plaintextPassword, hash);
            if (res) {
                return true;
            } else {
                return false;
            }
        } catch (err){
            throw new Error(err);
        }
    }

//}

//export default new Bcrypt();