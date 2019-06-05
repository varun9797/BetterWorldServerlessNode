import ownerController from "../components/owner/controller/OwnerController";
import responseFormat from "../lib/response-format"

export async function registerOwner(event) {
    try {
      let data = JSON.parse(event.body);
      console.log("registerOwner ", data);
      let result = await ownerController.registerOwner(data);
      return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
    } catch (err) {
      console.error("handler :: registerOwner :: Error ", err);
      return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
    }
}

