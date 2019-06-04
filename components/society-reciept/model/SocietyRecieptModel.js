import queryMediator from '../../utility/QueryMediator';
class SocietyRecieptModel {
    constructor(){
        console.log("inside SocietyRecieptModel");
    }

    createOrUpdatePaymentStructure = async (body, httpMethod)=>{
        try {
            console.log("SocietyRecieptModel:: createOrUpdatePaymentStructure : ")
            if(httpMethod == 'POST'){
                let query = `call create_payment_structure( ${body.societyId}, ${body.flatType},${body.createdBy},${body.buildingMaintenance}, ${body.parkingMaintenance}, ${body.municipalDue},
                    ${body.sinkingFund}, ${body.electricityCharge})`
                  let result = await queryMediator.queryConnection(query);
                return result;
            } else if(httpMethod == 'PUT' && body.paymentStructureId){
                let query = `call update_payment_structure(${body.paymentStructureId}, ${body.societyId}, ${body.flatType},${body.createdBy},${body.buildingMaintenance}, ${body.parkingMaintenance}, ${body.municipalDue},
                    ${body.sinkingFund}, ${body.electricityCharge})`
                  let result = await queryMediator.queryConnection(query);
                return result;
            } else {
                throw new Error("Invalid Request");
            }
        } catch(err) {
            console.log("SocietyRecieptModel:: createOrUpdatePaymentStructure Error : ",err);
            throw new Error(err);
        }
    }

    getPaymentStructure = async (body)=>{
        try {
            console.log("SocietyRecieptModel:: getPaymentStructure : ");
            let query = `call get_payment_structure(${body.paymentStructureId})`;
            let result = await queryMediator.queryConnection(query);
            return result;
        } catch(err) {
            console.log("SocietyRecieptModel:: getPaymentStructure Error : ",err);
            throw new Error(err);
        }
    }

    updatePendingPayment = async (body)=>{
        try {
            console.log("SocietyRecieptModel:: updatePendingPayment : ");
            let query = `call update_pending_payment(${body.flatid}, ${body.pendingPayment}, ${body.ownerid})`;
            let result = await queryMediator.queryConnection(query);
            return result;
        } catch(err) {
            console.log("SocietyRecieptModel:: updatePendingPayment Error : ",err);
            throw new Error(err);
        }
    }

}

export default new SocietyRecieptModel();