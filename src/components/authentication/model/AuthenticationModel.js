import queryMediator from '../../utility/QueryMediator';

class AuthenticationModel {
    constructor(){
        console.log("inside AuthenticationModel");
         
    }

    loginUser = async (body)=>{
        try {
            console.log("SocietyModel:: loginUser : ");
            let query = `SELECT ownerid, ownername, phoneNumber, email, gender, password, type, dateOfBirth FROM owner WHERE email = '${body.email}'`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse[0];
        } catch(err) {
            console.log("SocietyModel:: loginUser Error : ",err);
            throw new Error(err);
        }
    } 
}

export default new AuthenticationModel();