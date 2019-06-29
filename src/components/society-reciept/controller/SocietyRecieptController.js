const societyRecieptModel = require("./../model/SocietyRecieptModel")
const notification =  require("./../../utility/Notification")
const queryMediator = require('../../utility/QueryMediator');

var aws = require('aws-sdk');
var lambda = new aws.Lambda();

// class SocietyRecieptController {
//     constructor(){
//         console.log("inside SocietyRecieptController");
         
//     }
    export async function createOrUpdateReciept (body, httpMethod) {
        try {
            if(await validateCreateOrUpdateReciept(body)){
                console.log("SocietyRecieptController :: createOrUpdateReciept");
                let promiseArr = [];
                body.flatTypeArr.forEach((flatType)=>{
                    body.flatType = flatType;
                    promiseArr.push(societyRecieptModel.createOrUpdatePaymentStructure(body, httpMethod))
                })
                await Promise.all(promiseArr);
                //this.notifyOwnersOnNewMonthlyReciept(body); 
                body.method = "notifyOwnersOnNewMonthlyReciept";   
                invokeLambda(body);
                await new Promise(resolve => setTimeout(resolve, 50));
                return;
            } else {
                throw new Error("invalid input");
            }

        } catch(err) {
            console.log("SocietyRecieptController :: createOrUpdateReciept :: Error", err);
            throw new Error(err);
        } 
    }

    export async function validateCreateOrUpdateReciept (body){
        try {
            console.log("SocietyRecieptController :: validateCreateOrUpdateReciept");
            let query = `SELECT count(flatid) AS flatCount FROM flat where (role =2) and ownerid =${body.senderInfo.ownerid} 
            and societyid =${body.societyId}`;
            let result = await queryMediator.queryConnection(query);
            if(result.dbResponse && result.dbResponse[0] && result.dbResponse[0].flatCount>0){
                return true;
            } else {
                return false
            }
        } catch(err){
            console.log("SocietyRecieptController :: validateCreateOrUpdateReciept :: Error", err);
            throw new Error(err);
        }
    }

    export async function  invokeLambda (event) {
        let params = {
            FunctionName: 'lambda-node-dev-email',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(event, null, 2)
          };

          return lambda.invoke(params).promise().then((data) => {
            console.log('ambda-node-dev-email inoked ' ,  data.Payload);
            if (data.FunctionError) {
              throw new Error(data.Payload);
            }
            else {
              return Promise.resolve(JSON.parse(data.Payload));
            }
          }).catch((err) => {
            console.log('lambdaService::invokeGraphQL::error: ', err);
            return Promise.reject(err);
          });
    }

    export async function notifyOwnersOnNewMonthlyReciept (body) {
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

    export async function monthlyRecieptUpdateByCron  (){
        try {
            console.log("SocietyRecieptController :: monthlyRecieptUpdateByCron");
            let result = await societyRecieptModel.getDistinctSocietyIdAndFlatType();
            let societyIdArray = result[0].societyid.split(',');
            let flatTypeArray = result[0].flattype.split(',');
            for(let societyId of societyIdArray){
                for(let flatType of flatTypeArray){
                    await societyRecieptModel.monthlyRecieptUpdateByCron({maintenanceAmount:0,societyId:societyId,flatType:flatType})
                }
            }
            notifyOwnersOnCronUpdation(societyIdArray);
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: monthlyRecieptUpdateByCron :: Error", err);
            throw new Error(err);
        } 
    }

    export async function getPaymentStructure (body){
        try {
            console.log("SocietyRecieptController :: getPaymentStructure");
            let result = await societyRecieptModel.getPaymentStructure(body);
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: getPaymentStructure :: Error", err);
            throw new Error(err);
        } 
    }
    export async function updatePendingPayment (body) {
        try {
            console.log("SocietyRecieptController :: updatePendingPayment");
            let result = await societyRecieptModel.updatePendingPayment(body);
            //this.notifyOwnerOnUpdateOfPendingPayment(body)
            body.method = "notifyOwnerOnUpdateOfPendingPayment"; 
            invokeLambda(body);
            await new Promise(resolve => setTimeout(resolve, 50));
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: updatePendingPayment :: Error", err);
            throw new Error(err);
        } 
    } 

    export async function notifyOwnerOnUpdateOfPendingPayment (body) {
        try {
            console.log("SocietyRecieptController :: notifyOwnerOnUpdateOfPendingPayment");
            let result = await societyRecieptModel.getOwnerDetailByflatId(body.flatid)
            for (let obj of result){
                await notification.pendingAmountUpdation(obj);
            }
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: notifyOwnerOnUpdateOfPendingPayment :: Error", err);
            throw new Error(err);
        } 
    }

    export async function getPaymentHistory (body) {
        try {
            console.log("SocietyRecieptController :: getPaymentHistory");
            let result = await societyRecieptModel.getPaymentHistory(body);
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: getPaymentHistory :: Error", err);
            throw new Error(err);
        } 
    }

    
    
    export async function notifyOwnersOnCronUpdation (societyIds) {
        try {
            console.log("SocietyRecieptController :: notifyOwnersOnCronUpdation");
            let result = await societyRecieptModel.getOwnersEmailBySocietyIds(societyIds);
            for (let obj of result){
                await notification.pendingAmountUpdation(obj);
            }
            return result;
        } catch(err) {
            console.log("SocietyRecieptController :: notifyOwnersOnCronUpdation :: Error", err);
            throw new Error(err);
        } 
    }
// }

// export default new SocietyRecieptController();