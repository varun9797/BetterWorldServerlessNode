'use strict';
import societyRecieptController from "./components/society-reciept/controller/SocietyRecieptController";
import ownerController from "./components/owner/controller/OwnerController";
import responseFormat from "./lib/response-format"

export async function putOrPostSocietyReciept(event) {
  try {
    let data = JSON.parse(event.body);
    let httpMethod = event.httpMethod;
    console.log("handler :: putOrPostSocietyReciept ", data);
    await societyRecieptController.createOrUpdateReciept(data, httpMethod);
    return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", null);
  } catch (err) {
    console.error("handler :: putOrPostSocietyReciept :: Error ", err);
    return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}

export async function getSocietyReciept(event) {
  try {
    console.log("handler :: getSocietyReciept ", event.queryStringParameters);
    let result = await societyRecieptController.getPaymentStructure(event.queryStringParameters);
    return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
  } catch (err) {
    console.error("handler :: getSocietyReciept :: Error ", err);
    return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}

export async function updatePendingPayment(event) {
  try {
    let data = JSON.parse(event.body);
    console.log("handler :: updatePendingPayment ", data);
    let result = await societyRecieptController.updatePendingPayment(data);
    return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
  } catch (err) {
    console.error("handler :: updatePendingPayment :: Error ", err);
    return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}

export async function getPaymentHistory(event) {
  try {
    console.log("handler :: getPaymentHistory ", event.queryStringParameters);
    let result = await societyRecieptController.getPaymentHistory(event.queryStringParameters);
    return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
  } catch (err) {
    console.error("handler :: getPaymentHistory :: Error ", err);
    return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}
  export async function registerOwner(event) {
    try {
      let data = JSON.parse(event.body);
      let result = await ownerController.registerOwner(data);
      return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
    } catch (err) {
      console.error("handler :: getPaymentHistory :: Error ", err);
      return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
    }
}


