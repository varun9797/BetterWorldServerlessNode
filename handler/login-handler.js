import authenticationController from "../components/authentication/controller/AuthenticationController";
import responseFormat from "../lib/response-format"
export async function loginUser(event) {
    try {
      let data = JSON.parse(event.body);
      console.log("registerOwner ", data);
      let result = await authenticationController.loginUser(data);
      return responseFormat.getResponseObject("success", responseFormat.statusCode["SUCCESS"], "function executed successfully!", result);
    } catch (err) {
      console.error("handler :: loginUser :: Error ", err);
      return responseFormat.getResponseObject("error", responseFormat.statusCode["INTERNAL_SERVER_ERROR"], "Something went wrong!", err.message);
    }
  }
  