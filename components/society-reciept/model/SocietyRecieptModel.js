import queryMediator from '../../utility/QueryMediator';
class SocietyRecieptModel {
    constructor(){
        console.log("inside SocietyRecieptModel");
    }

    createPaymentStructure = async (body)=>{
        try {
            console.log("SocietyRecieptModel:: createPaymentStructure : ")
            let query = `call create_payment_structure( ${body.societyId}, ${body.flatType},${body.createdBy},${body.buildingMaintenance}, ${body.parkingMaintenance}, ${body.municipalDue},
                ${body.sinkingFund}, ${body.electricityCharge})`
              let result = await queryMediator.queryConnection(query);
            return result;
        } catch(err) {
            console.log("SocietyRecieptModel:: createPaymentStructure Error : ",err);
            throw Error(err);
        }
    }


}

export default new SocietyRecieptModel();