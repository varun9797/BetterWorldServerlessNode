import queryMediator from '../../utility/QueryMediator';

class FlatModel {
    constructor(){
        console.log("inside FlatModel");
         
    }

    getFlatsByOwnerId = async (body)=>{
        try {
            console.log("FlatModel:: getFlatsByOwnerId : ");
            let query = `call get_flats_by_ownerid(${body.ownerId})`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse[0];
        } catch(err) {
            console.log("FlatModel:: getFlatsByOwnerId Error : ",err);
            throw new Error(err);
        }
    } 
}

export default new FlatModel();