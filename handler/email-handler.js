
import societyRecieptController from './../src/components/society-reciept/controller/SocietyRecieptController'
import responseFormat from "../lib/response-format"
export async function email(event, context) {
    try {
      console.log("inside email lambda", event);
      var json = event;
      let result 
      if(json.method == "notifyOwnersOnNewMonthlyReciept"){
        result = await societyRecieptController.notifyOwnersOnNewMonthlyReciept(json);
      } else if(json.method == "notifyOwnerOnUpdateOfPendingPayment"){
        result = await societyRecieptController.notifyOwnerOnUpdateOfPendingPayment(json);
      }
      
      return responseFormat.getLambdaResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
    } catch (err) {
      console.error("email lambda :: Error ", err);
        return responseFormat.getLambdaResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);    
    }
  }