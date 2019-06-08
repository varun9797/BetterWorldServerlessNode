import ownerModel from "./../model/OwnerModel"
import bcrypt from '../../../lib/bcrypt'

class OwnerController {
    constructor(){
        console.log("inside OwnerController");
         
    }

    registerOwner = async (body) => {
        try {
            console.log("SocietyController :: registerOwner");
            body.password =  await bcrypt.bcryptPassword(body.password);
            let result = await ownerModel.registerOwner(body);
            return result;
        } catch(err) {
            console.log("SocietyController :: registerOwner :: Error", err);
            throw new Error(err);
        } 
    } 
}

export default new OwnerController();