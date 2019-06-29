const queryMediator = require( '../../utility/QueryMediator');

// class FlatModel {
//     constructor(){
//         console.log("inside FlatModel");
         
//     }

    // getFlatsByOwnerId = async (body)=>{
    //     try {
    //         console.log("FlatModel:: getFlatsByOwnerId : ");
    //         let query = `call get_flats_details(${body.ownerId}, ${null})`;
    //         let result = await queryMediator.queryConnection(query);
    //         return result.dbResponse[0];
    //     } catch(err) {
    //         console.log("FlatModel:: getFlatsByOwnerId Error : ",err);
    //         throw new Error(err);
    //     }
    // } 

    export async function getFlats (body){
        try {
            console.log("FlatModel:: getFlatsByOwnerId : ");
            let query;
            if(body.ownerId && body.societyId){
                query = `call get_flats_details(${body.ownerId}, ${body.societyId})`;
            } else if(body.ownerId){
                query = `call get_flats_details(${body.ownerId}, ${null})`;
            } else if(body.societyId) {
                query = `call get_flats_details(${null}, ${body.societyId})`;
            } else {
                throw Error("invalid request")
            }
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse[0];
        } catch(err) {
            console.log("FlatModel:: getFlatsByOwnerId Error : ",err);
            throw new Error(err);
        }
    } 

    // getFlatsBySocietyId = async (body)=>{
    //     try {
    //         console.log("FlatModel:: getFlatsBySocietyId : ");
    //         let query = `call get_flats_details(${null}, ${body.societyId})`;
    //         // let query = `SELECT flatid, flatname, buildingname, societyid, tenantid, pendingpayment, 
    //         // createdDate, updatedDate, createdBy, updatedBy, maintenanceAmount, role, 
    //         // FlatType, paymentStructureId, ownerid from flat where societyid =${body.societyId} `;
    //         let result = await queryMediator.queryConnection(query);
    //         return result.dbResponse[0];
    //     } catch(err) {
    //         console.log("FlatModel:: getFlatsBySocietyId Error : ",err);
    //         throw new Error(err);
    //     }
    // } 
// }

// export default new FlatModel();