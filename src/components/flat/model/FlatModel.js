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
    
    insertFlatFiles = async (body)=>{
        try {
            console.log("FlatModel:: insertFlatFiles : ");
            let query = `INSERT INTO flatFiles (flatid, filelocation, filekey, Bucket)
             VALUES (${body.flatId},${mysql.escape(body.Location)},${mysql.escape(body.key)},
             ${mysql.escape(body.Bucket)})`;
            
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse;
        } catch(err) {
            console.log("FlatModel:: insertFlatFiles Error : ",err);
            throw new Error(err);
        }
    }
}

export default new FlatModel();