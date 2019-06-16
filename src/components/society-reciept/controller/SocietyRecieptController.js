import societyRecieptModel from "./../model/SocietyRecieptModel"
import notification from "./../../utility/Notification"

var aws = require('aws-sdk');
var lambda = new aws.Lambda();

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
            //this.notifyOwnersOnNewMonthlyReciept(body);
            this.invokeLambda(body);
            return;
        } catch(err) {
            console.log("SocietyRecieptController :: createOrUpdateReciept :: Error", err);
            throw new Error(err);
        } 
    }

    invokeLambda = async (event) =>{
        let params = {
            FunctionName: 'lambda-node-dev-email',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(event, null, 2)
          };
          return await lambda.invoke(params, function(err, data) {
            if (err) {
                console.log('ambda-node-dev-email :: Error ' +  err);
            } else {
              console.log('ambda-node-dev-email inoked ' +  data.Payload);
            }
          }).promise();
    }

    notifyOwnersOnNewMonthlyReciept = async (body) => {
        try {
            console.log("SocietyRecieptController :: notifyOwnersOnNewMonthlyReciept");
            let result = await societyRecieptModel.getOwnersEmailBySocietyIdAndFlatType(body);
            for (let obj of result){
                await notification.newMaintenanceRecipet(obj);
            }
            return "Email Sent!!!";
        } catch(err) {
            console.log("SocietyRecieptController :: notifyOwnersOnNewMonthlyReciept :: Error", err);
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
            this.notifyOwnersOnCronUpdation(societyIdArray);
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

    
    
    notifyOwnersOnCronUpdation = async (societyIds) => {
        try {
            console.log("SocietyRecieptController :: getOwnersEmailBySocietyIds");
            let result = await societyRecieptModel.getOwnersEmailBySocietyIds(societyIds);
            for (let obj of result){
                await notification.pendingAmountUpdationByCron(obj);
            }
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: getOwnersEmailBySocietyIds :: Error", err);
            throw new Error(err);
        } 
    }
}

export default new SocietyRecieptController();