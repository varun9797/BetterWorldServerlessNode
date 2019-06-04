import ownerModel from "./../model/OwnerModel"


class SocietyRecieptController {
    constructor(){
        console.log("inside SocietyRecieptController");
         
    }

    registerOwner = async (body) => {
        try {
            console.log("SocietyRecieptController :: registerOwner");
            let result = await ownerModel.registerOwner(body);
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: registerOwner :: Error", err);
            throw new Error(err);
        } 
    } 
}

export default new SocietyRecieptController();