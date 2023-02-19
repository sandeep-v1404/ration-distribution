const sdk = require("node-appwrite");
const jwt = require("jsonwebtoken");
/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  if (!req.variables["APPWRITE_FUNCTION_ENDPOINT"]) {
    res.json({ success: false, message: "Invalid payload." });
    return;
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"]);
  }

  const { token } = JSON.parse(req.payload ?? "{}");
  let decodedData;
  if (token) {
    decodedData = jwt.verify(token, "asasasas");
    res.json({ success: true, user: decodedData });
  } else {
    res.json({ success: false, message: "Login" });
  }
};
