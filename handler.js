'use strict';
import societyRecieptController from "./components/society-reciept/controller/SocietyRecieptController";
import responseFormat from "./lib/response-format"

export async function putOrPostSocietyReciept(event) {
  try {
    let data = JSON.parse(event.body);
    let httpMethod = event.httpMethod;
    console.log("post event is ", data);
    await societyRecieptController.createOrUpdateReciept(data, httpMethod);
    return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", null);
  } catch (err) {
    return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}

export async function getSocietyReciept(event) {
  try {
    console.log("get event is ", event.queryStringParameters);
    let result = await societyRecieptController.getPaymentStructure(event.queryStringParameters);
    return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
  } catch (err) {
    return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
  }
}


