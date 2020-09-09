const { Router } = require("express");
const { API } = require("../api");

const router = Router();

router.post("/exchange", API.exchange);

module.exports = router;
