const sdk = require("node-appwrite");
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

  const { productName, quantity, APL_Price, BPL_Price } = JSON.parse(
    req.payload ?? "{}"
  );

  if (!productName || !quantity || !APL_Price || !BPL_Price) {
    return res.json({
      success: false,
      message: "Invalid payload.",
      data: req.payload,
    });
  }

  const productNameCheck = await database.listDocuments(
    req.variables["databaseId"],
    req.variables["collectionId"],
    [Query.equal("productName", productName)]
  );

  if (productNameCheck.total > 0) {
    return res.json({
      success: false,
      message: "Product Exists",
    });
  } else {
    const promise2 = database.createDocument(
      req.variables["databaseId"],
      req.variables["collectionId"],
      ID.unique(),
      {
        productName,
        quantity,
        APL_Price,
        BPL_Price,
      }
    );

    promise2
      .then(function (data) {
        return res.json({
          success: true,
          data: data,
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
