const { Router } = require("express");
const { API } = require("../api");

const router = Router();

router.post("/exchange", API.exchange);
router.get("/available_currencies", API.getAvailableCurrencies);
router.get("/currency/info/:ticker", API.getCurrencyInfo);
router.get("/minimal-amount/:from_to", API.getMinimalExchangeAmount);
router.get("/estimated-amount/:send_amount/:from_to", API.getEstimatedAmount);
router.get("/transaction/status/:id", API.getTransactionStatus);

module.exports = router;
