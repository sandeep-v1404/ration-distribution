const sdk = require("node-appwrite");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ID, Query } = require("node-appwrite");
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
  const database = new sdk.Databases(client);

  if (!req.variables["APPWRITE_FUNCTION_ENDPOINT"]) {
    res.json({ success: false, message: "Invalid payload." });
    return;
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"]);
  }

  const { name, mobile, address, aadhar, category, password, type } =
    JSON.parse(req.payload ?? "{}");

  if (!name || !mobile || !address || !aadhar || !password || !type) {
    return res.json({
      success: false,
      message: "Invalid payload.",
      data: req.payload,
    });
  }

  const aadharCheck = await database.listDocuments(
    req.variables["databaseId"],
    req.variables["collectionId"],
    [Query.equal("aadhar", parseInt(aadhar))]
  );

  const mobileCheck = await database.listDocuments(
    req.variables["databaseId"],
    req.variables["collectionId"],
    [Query.equal("mobile", parseInt(mobile))]
  );

  if (aadharCheck.total > 0 || mobileCheck.total > 0) {
    return res.json({
      success: false,
      message: "User Exists",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    const promise2 = database.createDocument(
      req.variables["databaseId"],
      req.variables["collectionId"],
      ID.unique(),
      {
        name,
        mobile,
        address,
        aadhar,
        category,
        password: hashedPassword,
        type,
      }
    );

    promise2
      .then(function (data) {
        const token = jwt.sign(
          { name, mobile, address, aadhar, category, type, id: data.$id },
          "asasasas",
          {
            expiresIn: "1h",
          }
        );
        return res.json({
          success: true,
          token,
        });
      })
      .catch(function (err) {
        return res.json({
          success: false,
          message: "Unexpected error: " + err,
        });
      });
  }
};
