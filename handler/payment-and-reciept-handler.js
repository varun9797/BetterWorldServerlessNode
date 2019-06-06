'use strict';
import societyRecieptController from "../components/society-reciept/controller/SocietyRecieptController";
import responseFormat from "../lib/response-format"

export async function putOrPostSocietyReciept(event) {
  try {
    let data = JSON.parse(event.body);
    let httpMethod = event.httpMethod;
    console.log("putOrPostSocietyReciept ", data);
    await societyRecieptController.createOrUpdateReciept(data, httpMethod);
    return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", null);
  } catch (err) {
    console.error("putOrPostSocietyReciept :: Error ", err);
    return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}

export async function getSocietyReciept(event) {
  try {
    console.log("getSocietyReciept ", event.queryStringParameters);
    let result = await societyRecieptController.getPaymentStructure(event.queryStringParameters);
    return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
  } catch (err) {
    console.error("getSocietyReciept :: Error ", err);
    return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}

export async function updatePendingPayment(event) {
  try {
    let data = JSON.parse(event.body);
    console.log("updatePendingPayment ", data);
    let result = await societyRecieptController.updatePendingPayment(data);
    return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
  } catch (err) {
    console.error("updatePendingPayment :: Error ", err);
    return  responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}

export async function getPaymentHistory(event) {
  try {
    console.log("getPaymentHistory ", event.queryStringParameters);
    let result = await societyRecieptController.getPaymentHistory(event.queryStringParameters);
    return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
  } catch (err) {
    console.error("getPaymentHistory :: Error ", err);
    return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}

