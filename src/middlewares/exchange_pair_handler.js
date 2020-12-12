const rp = require("request-promise");
const { CustomError } = require("../custom");
const { CHANGENOW_API } = require("../env");

const ExchangePairHandler = (function () {
 var exchangeMap;
 async function refreshMap() {
  console.log("Refreshing exchange map");
  const response = await rp.get(
   CHANGENOW_API + "/v1/market-info/available-pairs",
   {
    json: true,
    resolveWithFullResponse: true,
    headers: { Accept: "application/json" }
   }
  );
  if (response.statusCode > 400) {
   return CustomError(
    response.statusCode,
    "Couldn't get available exchange pairs"
   );
  }
  const available_pairs = response.body;
  console.log(available_pairs);
  for (const pair of available_pairs) {
   var [from, to] = pair.split("_");
   if (from.toLowerCase() == "usdt" || to.toLowerCase() == "usdt") {
    // We only allow udsterc20
    continue;
   }
   if (from.toLowerCase() == "usdterc20") {
    from = "usdt";
   }
   if (to.toLowerCase() == "usdterc20") {
    to = "usdt";
   }
   if (exchangeMap.has(from)) {
    exchangeMap.get(from).add(to);
   } else {
    exchangeMap.set(from, new Set());
    exchangeMap.get(from).add(to);
   }
  }
 }

 return {
  getExchangeList: async function (from) {
   if (!exchangeMap) {
    exchangeMap = new Map();
    await refreshMap();
    setInterval(async () => {
     refreshMap();
    }, 3600000);
   }
   if (exchangeMap.has(from)) {
    return Promise.resolve(Array.from(exchangeMap.get(from)));
   } else {
    return Promise.resolve([]);
   }
  }
 };
})();

module.exports = ExchangePairHandler;
