const rp = require("request-promise");
const { CustomError } = require("../custom");
// const { CHANGENOW_API_KEY, CHANGENOW_API } = require("../env");

// const options = {
//  json: true,
//  resolveWithFullResponse: true,
//  headers: {
//  }
// };

const normalizeAmbiguousTickers = (from_to) => {
  /**
   * In ChangeNow API for ERC20 tokens only USDT is ambiguous.
     So converting usdt to usdterc20
   */
  let [ from, to ] = from_to.split("_");
   
  if(from.toLowerCase() === "usdt") 
   from += "erc20";
   
  if(to.toLowerCase() === "usdt") 
   to += "erc20";
   
  return [from, to];
};

class API {
 static async exchange(req, res) {
  try {
   // Parameters from request body
   const { from, to, address, amount } = req.body;
   const [ f, t ] = normalizeAmbiguousTickers(from + "_" + to); 
   // api object from request
   const { url, options, apiKey } = req.api;

   console.log(f, t);

   // New body
   const body = { from: f, to: t, address, amount };
   
   // ChangeNow exchange
   const apiResponse = await rp.post(url + "/v1/transactions/" + apiKey, {
    ...options,
    body: {
     ...body,
     extraId: "",
     refundAddress: "",
     refundExtraId: "",
     userId: "",
     payload: "",
     contactEmail: ""
    }
   });
    
   // Throw error if API status code is within 4XX and 5XX ranges
   if (apiResponse.statusCode >= 400) {
     console.log(JSON.stringify(apiResponse));
     throw new CustomError(apiResponse.statusCode, apiResponse.body.message || `API responded with a ${apiResponse.statusCode}`);
   }
   // Main response
   const r = {
    ...apiResponse.body
   };

   console.log(r);

   // Send response
   res.status(200).json({
    statusCode: 200,
    response: {
     ...r
    }
   });
   
  } catch (error) {
   res.status(error.c || 500).send(error.message);
  }
 }

 static async getAvailableCurrencies(req, res) {
  try {
   // Obtain `api` object from request and destructure it
   const { url, options } = req.api;

   // Obtain list of currencies
   const apiResponse = await rp.get(url + "/v1/currencies?active=true&fixedRate=true", { ...options });

   // Throw error if API response status range is within 4XX to 5XX
   if (apiResponse.statusCode >= 400)
    throw new CustomError(apiResponse.statusCode, apiResponse.body.message || `API responded with a ${apiResponse.statusCode}`);
   
   // Main response
   const response = {
    ...apiResponse.body
   };

   // Send response
   res.status(200).json({
    statusCode: 200,
    response
   });
  } catch (error) {
   res.status(error.c || 500).send(error.message);
  }
 }

 static async getCurrencyInfo(req, res) {
  try {
   // Get api object from request
   const { url, options } = req.api;

   // Currency ticker
   const { ticker } = req.params;

   // Obtain currency info
   const apiResponse = await rp.get(url + "/v1/currencies/" + ticker, { ...options });

   // Throw error if api response status code is within 4XX or 5XX
   if (apiResponse.statusCode >= 400)
    throw new CustomError(apiResponse.statusCode, apiResponse.body.message || `API responded with a ${apiResponse.statusCode}`);
   
   // Main response
   const response = {
    ...apiResponse.body
   };

   // Send response
   res.status(200).json({
    statusCode: 200,
    response
   });
  } catch (error) {
   res.status(error.c || 500).send(error.message);
  }
 }
 // static normalizeAmbiguousTickers(from_to) {
 //    /*
 //     In ChangeNow API for ERC20 tokens only USDT is ambiguous.
 //     So converting usdt to usdterc20
 //    */
 //    let [from,to] = from_to.split("_");
 //    if(from === "usdt") from += "erc20";
 //    if(to === "usdt") to += "erc20";
 //    return [from,to];
 // }
 static async getMinimalExchangeAmount(req, res) {
  try {
   // Get string from request parameter
   const { from_to } = req.params;
    
   // Get request object
   const [from, to] = normalizeAmbiguousTickers(from_to);
   const { url, options } = req.api;

   // Obtain info
   const apiResponse = await rp.get(url + "/v1/min-amount/" + from+"_"+to, { ...options });
   // Throw error if any
   if (apiResponse.statusCode >= 400)
    throw new CustomError(apiResponse.statusCode, apiResponse.body.message || `API responded with a ${apiResponse.statusCode}`);

   // Main response
   const response = {
    ...apiResponse.body
   };

   // Send response
   res.status(200).json({
    statusCode: 200,
    response
   });
  } catch (error) {
   res.status(error.c || 500).send(error.message);
  }
 }

 static async getEstimatedAmount(req, res) {
  try {
   // Get string from request parameter
   const { from_to, send_amount } = req.params;

   // Get request object
   const { url, options, apiKey } = req.api;
   const [from, to] = normalizeAmbiguousTickers(from_to); 
   // Obtain info
   const apiResponse = await rp.get(url + "/v1/exchange-amount/" + send_amount + "/" + from + "_" + to + `?api_key=${apiKey}`, { ...options });

   // Throw error if any
   if (apiResponse.statusCode >= 400)
    throw new CustomError(apiResponse.statusCode, apiResponse.body.message || `API responded with a ${apiResponse.statusCode}`);

   // Main response
   const response = {
    ...apiResponse.body
   };

   // Send response
   res.status(200).json({
    statusCode: 200,
    response
   });
  } catch (error) {
   res.status(error.c || 500).send(error.message);
  }
 }

 static async getTransactionStatus(req, res) {
  try {
   // Get string from request parameter
   const { id } = req.params;

   // Get request object
   const { url, options, apiKey } = req.api;

   // Obtain info
   const apiResponse = await rp.get(url + "/v1/transactions/" + id + "/" + apiKey, { ...options });

   // console.log(apiResponse);

   // Throw error if any
   if (apiResponse.statusCode >= 400)
    throw new CustomError(apiResponse.statusCode, apiResponse.body.message || `API responded with a ${apiResponse.statusCode}`);

   // Main response
   const response = {
    ...apiResponse.body
   };

   // Send response
   res.status(200).json({
    statusCode: 200,
    response
   });
  } catch (error) {
   res.status(error.c || 500).send(error.message);
  }
 }
}

module.exports = {
 API
};
