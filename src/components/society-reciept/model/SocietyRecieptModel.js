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
            console.log("SocietyRecieptModel:: createOrUpdatePaymentStructure Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    }

    getPaymentStructure = async (body)=>{
        try {
            console.log("SocietyRecieptModel:: getPaymentStructure : ");
            let query = `call get_payment_structure(${body.paymentStructureId})`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse[0];
        } catch(err) {
            console.log("SocietyRecieptModel:: getPaymentStructure Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    }

    updatePendingPayment = async (body)=>{
        try {
            console.log("SocietyRecieptModel:: updatePendingPayment : ");
            let query = `call update_pending_payment(${body.flatid}, ${body.pendingPayment}, ${body.ownerid})`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse[0];
        } catch(err) {
            console.log("SocietyRecieptModel:: updatePendingPayment Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    }

    getPaymentHistory = async (body)=>{
        try {
            console.log("SocietyRecieptModel:: updatePendingPayment : ");
            let query = `select idpaymenthistory, flatid, amount, createddate, updateddate, ownerid, remainingbalance, updatedby, comment from paymenthistory where flatid = ${body.flatId}`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse;
        } catch(err) {
            console.log("SocietyRecieptModel:: updatePendingPayment Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    }

    getDistinctSocietyIdAndFlatType = async ()=>{
        try {
            console.log("SocietyRecieptModel:: updatePendingPayment : ");
            let query = `select
            (select  group_concat(DISTINCT societyid) from flat) as societyid,
            (SELECT group_concat(DISTINCT flattype) FROM flat) as flattype;`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse;
        } catch(err) {
            console.log("SocietyRecieptModel:: updatePendingPayment Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    }

    monthlyRecieptUpdateByCron = async (body)=>{
        try {
            console.log("SocietyRecieptModel:: monthlyRecieptUpdateByCron : ");
            let query = `UPDATE flat f1 
            INNER JOIN (SELECT flatid, SUM(f.pendingpayment + f.maintenanceAmount) AS newPendingAmt FROM flat f GROUP BY flatId
            ) AS f2 ON f1.flatid = f2.flatid
            SET  f1.pendingpayment = newPendingAmt ,f1.maintenanceAmount = ${body.maintenanceAmount}, f1.updatedBy = "cron"
            where societyid = ${body.societyId}	and	FlatType = ${body.flatType} ;`;
            //console.log(query);
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse;
        } catch(err) {
            console.log("SocietyRecieptModel:: monthlyRecieptUpdateByCron Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    }
    

    getOwnersEmailBySocietyIds = async (societyIds)=>{
        try {
            console.log("SocietyRecieptModel:: getOwnersEmailBySocietyIds : ");
            let query = `SELECT  o.email, o.ownername, f.maintenanceAmount, f.pendingpayment, f.flatid, f.flatname, s.societyname FROM owner o 
            inner join flat f on f.ownerid = o.ownerid 
            inner join society s on s.societyid = f.societyid
            where s.societyid in (${societyIds})`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse;
        } catch(err) {
            console.log("SocietyRecieptModel:: getOwnersEmailBySocietyIds Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    }

    getOwnersEmailBySocietyIdAndFlatType = async (body)=>{
        try {
            console.log("SocietyRecieptModel:: getOwnersEmailBySocietyIds : ");
            let query = `SELECT  P.buildingMaintenance,  P.parkingMaintenance,P.municipalDue, P.sinkingFund, P.electricityCharge, P.createdBy, P.createdDate, P.updatedBy, P.updatedDate , O.email, O.ownername,F.flatid, F.flatType FROM owner O 
            inner join flat F on F.ownerid = O.ownerid 
            inner join paymentstructure P on F.paymentStructureId = P.id  
            where F.societyid = ${body.societyId} and F.flatType in (${body.flatTypeArr}) and P.isActive =1`;
            let result = await queryMediator.queryConnection(query);
            return result.dbResponse;
        } catch(err) {
            console.log("SocietyRecieptModel:: getOwnersEmailBySocietyIds Error : ",JSON.stringify(err));
            throw new Error(err);
        }
    }

}

export default new SocietyRecieptModel();