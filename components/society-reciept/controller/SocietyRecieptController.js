import societyRecieptModel from "./../model/SocietyRecieptModel"


class SocietyRecieptController {
    constructor(){
        console.log("inside SocietyRecieptController");
         
    }
    createOrUpdateReciept = async (body, httpMethod) => {
        try {
            console.log("SocietyRecieptController :: createOrUpdateReciept");
            let promiseArr = [];
            body.flatTypeArr.forEach((flatType)=>{
                body.flatType = flatType;
                promiseArr.push(societyRecieptModel.createOrUpdatePaymentStructure(body, httpMethod))
            })
            await Promise.all(promiseArr);
            return;
        } catch(err) {
            console.log("SocietyRecieptController :: createOrUpdateReciept :: Error", err);
            throw new Error(err);
        } 
    }

    getPaymentStructure = async (body) => {
        try {
            console.log("SocietyRecieptController :: createOrUpdateReciept");
            let result = await societyRecieptModel.getPaymentStructure(body);
            return result.dbResponse[0];
        } catch(err) {
            console.log("SocietyRecieptController :: createOrUpdateReciept :: Error", err);
            throw new Error(err);
        } 
    }
}

export default new SocietyRecieptController();