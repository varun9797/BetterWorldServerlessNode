import ownerModel from "./../model/OwnerModel"


class SocietyController {
    constructor(){
        console.log("inside SocietyController");
         
    }

    registerOwner = async (body) => {
        try {
            console.log("SocietyController :: registerOwner");
            let result = await ownerModel.registerOwner(body);
            return result;
        } catch(err) {
            console.log("SocietyController :: registerOwner :: Error", err);
            throw new Error(err);
        } 
    } 
}

export default new SocietyController();