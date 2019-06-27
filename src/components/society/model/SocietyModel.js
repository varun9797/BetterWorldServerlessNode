import queryMediator from '../../utility/QueryMediator';


class SocietyModel {
    constructor(){
        console.log("inside OwnerModel");
         
    }

    getSocietyBySocietyId = async (body)=>{
        try {
            console.log("SocietyModel:: getSocietyBySocietyId : ");
            let query = `select societyid, societyname, updatedDate, address, createdDate, pincode from society where societyid = ${body.societyId}`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse;
        } catch(err) {
            console.log("SocietyModel:: getSocietyBySocietyId Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    } 
    getSocietyByOwnerId = async (body)=>{
        try {
            console.log("SocietyModel:: getSocietyByOwnerId : ");
            let query = `call get_society(${body.ownerId})`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse[0];
        } catch(err) {
            console.log("SocietyModel:: getSocietyByOwnerId Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    } 
}

export default new SocietyModel();