const { CHANGENOW_API, CHANGENOW_API_KEY } = require("../env");

module.exports = (req, res, next) => {
 try {
  const url = CHANGENOW_API;
  const apiKey = CHANGENOW_API_KEY;
  const options = {
   simple: false,
   json: true,
   resolveWithFullResponse: true,
   headers: {
    "Content-Type": "application/json"
   }
  };

  req.api = { url, options, apiKey };
  next();
 } catch (error) {
  res.status(error.c || 500).send(error.message);
 }
};