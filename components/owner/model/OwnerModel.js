import queryMediator from '../../utility/QueryMediator';
import bcrypt from '../../../lib/bcrypt'

class SocietyModel {
    constructor(){
        console.log("inside SocietyModel");
         
    }

    registerOwner = async (body)=>{
        try {
            console.log("SocietyModel:: registerOwner : ");
            let hashedPassword =  await bcrypt.bcryptPassword(body.password);
            let query = `insert into owner(ownername,type,phonenumber,email, dateOfBirth, gender, password) values ('${body.ownerName}',${body.type}, '${body.phoneNumber}','${body.email}','${body.dateOfBirth}',${body.gender}, '${hashedPassword}')`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse[0];
        } catch(err) {
            console.log("SocietyModel:: registerOwner Error : ",err);
            throw new Error(err);
        }
    } 
}

export default new SocietyModel();