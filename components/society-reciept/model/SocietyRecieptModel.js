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
                throw Error("Invalid Request");
            }
        } catch(err) {
            console.log("SocietyRecieptModel:: createOrUpdatePaymentStructure Error : ",err);
            throw Error(err);
        }
    }


}

export default new SocietyRecieptModel();