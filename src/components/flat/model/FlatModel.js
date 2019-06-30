import queryMediator from '../../utility/QueryMediator';
import mysql from "mysql";

class FlatModel {
    constructor(){
        console.log("inside FlatModel");
         
    }

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

    getFlats = async (body)=>{
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

    updateFlatDetails = async (body)=>{
        try {
            console.log("FlatModel:: updateFlatDetails : ");
            let obj = {
                status : body.status,
            }
            let query = `UPDATE flat SET ? WHERE flatId=${body.flatId}`;
            
            let result = await queryMediator.queryConnection(query, obj);
            return result.dbResponse;
        } catch(err) {
            console.log("FlatModel:: updateFlatDetails Error : ",err);
            throw new Error(err);
        }
    }
    
    insertFlatImages = async (body)=>{
        try {
            console.log("FlatModel:: insertFlatImages : ");
            let obj = {
                flatid:body.flatId,
                filelocation:mysql.escape(body.Location),
                Key:mysql.escape(body.Key),
                Bucket:mysql.escape(body.Bucket)
            }
            let query = "INSERT INTO flat (flatid, filelocation, Key, Bucket) VALUES ?";
            
            let result = await queryMediator.queryConnection(query, obj);
            return result.dbResponse[0];
        } catch(err) {
            console.log("FlatModel:: insertFlatImages Error : ",err);
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
}

export default new FlatModel();