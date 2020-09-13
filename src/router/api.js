const { Router } = require("express");
const { API } = require("../api");

const router = Router();

router.post("/exchange", API.exchange);
router.get("/available_currencies", API.getAvailableCurrencies);
router.get("/currency/info/:ticker", API.getCurrencyInfo);

module.exports = router;
