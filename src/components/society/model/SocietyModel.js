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
}

export default new SocietyModel();