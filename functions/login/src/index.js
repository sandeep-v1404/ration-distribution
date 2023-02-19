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

  const { aadhar, password } = JSON.parse(req.payload ?? "{}");

  if (!aadhar || !password) {
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

  if (aadharCheck.total === 0) {
    return res.json({
      success: false,
      message: "Invalid Credentials",
    });
  } else {
    const doc = aadharCheck.documents[0];
    const isPasswordCorrect = await bcrypt.compare(password, doc.password);
    if (!isPasswordCorrect) return res.json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        name: doc.name,
        mobile: doc.mobile,
        address: doc.address,
        aadhar: doc.aadhar,
        category: doc.category,
        type: doc.type,
        id: aadharCheck.documents[0].$id,
      },
      "asasasas",
      { expiresIn: "1h" }
    );

    res.json({ success: true, token });
  }
};
