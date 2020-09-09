const { CHANGENOW_API, CHANGENOW_API_KEY } = require("../env");

module.exports = (req, res, next) => {
 try {
  const url = CHANGENOW_API;
  const apiKey = CHANGENOW_API_KEY;
  const options = {
   json: true,
   resolveWithFullResponse: true,
   headers: {
    "Content-Type": "application/json"
   }
  };

  req.api = { url, options, apiKey };
  next();
 } catch (error) {
  res.status(500).json({
   statusCode: 500,
   response: error.message
  });
 }
};