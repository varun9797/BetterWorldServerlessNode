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

    monthlyRecieptUpdateByCron = async () =>{
        try {
            console.log("SocietyRecieptController :: createOrUpdateReciept");
            let result = await societyRecieptModel.getDistinctSocietyIdAndFlatType();
            let societyIdArray = result[0].societyid.split(',');
            let flatTypeArray = result[0].flattype.split(',');
            for(let societyId of societyIdArray){
                for(let flatType of flatTypeArray){
                    await societyRecieptModel.monthlyRecieptUpdateByCron({maintenanceAmount:0,societyId:societyId,flatType:flatType})
                }
            }
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: createOrUpdateReciept :: Error", err);
            throw new Error(err);
        } 
    }

    getPaymentStructure = async (body) => {
        try {
            console.log("SocietyRecieptController :: createOrUpdateReciept");
            let result = await societyRecieptModel.getPaymentStructure(body);
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: createOrUpdateReciept :: Error", err);
            throw new Error(err);
        } 
    }
    updatePendingPayment = async (body) => {
        try {
            console.log("SocietyRecieptController :: updatePendingPayment");
            let result = await societyRecieptModel.updatePendingPayment(body);
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: updatePendingPayment :: Error", err);
            throw new Error(err);
        } 
    } 
    getPaymentHistory = async (body) => {
        try {
            console.log("SocietyRecieptController :: updatePendingPayment");
            let result = await societyRecieptModel.getPaymentHistory(body);
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: updatePendingPayment :: Error", err);
            throw new Error(err);
        } 
    } 
}

export default new SocietyRecieptController();