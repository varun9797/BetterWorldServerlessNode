import societyRecieptModel from "./../model/SocietyRecieptModel"
      //1) Create Maintainance by Society Id according to flatType and Created By and updated By should e there
      // For every mainatinace recipet update every flats belong to that society and flat type
      //2) Update Flats
      // First add Pending Payment to the maintainance amount and add it to pending amount
      // Add new Maintainance in the flat table
      //
     // await  societyRecieptModel.test();


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
            let result = await Promise.all(promiseArr);
            console.log("SocietyRecieptController :: createOrUpdateReciept :: result",result)
        } catch(err) {
            console.log("SocietyRecieptController :: createOrUpdateReciept :: Error", err);
            throw Error(err);
        }
       
    }
}

export default new SocietyRecieptController();