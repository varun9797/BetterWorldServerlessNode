import queryMediator from '../../utility/QueryMediator';


class OwnerModel {
    constructor(){
        console.log("inside OwnerModel");
         
    }

    registerOwner = async (body)=>{
        try {
            console.log("SocietyModel:: registerOwner : ");
            let query = `insert into owner(ownername,type,phonenumber,email, dateOfBirth, gender, password) values ('${body.ownerName}',${body.type}, '${body.phoneNumber}','${body.email}','${body.dateOfBirth}',${body.gender}, '${body.password}')`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse[0];
        } catch(err) {
            console.log("SocietyModel:: registerOwner Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    } 

    getOwnerDetails = async (body)=>{
        try {
            console.log("SocietyModel:: getOwnerDetails : ");
            let query = `call get_owner_details_by_ownerid(${body.ownerId})`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse[0];
        } catch(err) {
            console.log("SocietyModel:: getOwnerDetails Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    }

    updateOwnerDetails = async (body)=>{
        try {
            if(body.ownerId) {
                console.log("SocietyModel:: updateOwnerDetails : ");
                //let query = `update owner set ownername = '${body.ownerName}', email= '${body.email}', phonenumber= '${body.phonenumber}', dateOfBirth = '${body.dateOfBirth}', gender =${body.gender} where ownerid=${body.ownerId}`;
                let query = `UPDATE owner SET ? WHERE ownerid=${body.ownerId}`;
                let result = await queryMediator.queryConnection(query, body);
                return result.dbResponse;
            } else {
                throw new Error("Missing Owner Id")
            }
        } catch(err) {
            console.log("SocietyModel:: updateOwnerDetails Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    }
}

export default new OwnerModel();