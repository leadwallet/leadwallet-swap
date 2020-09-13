const { Router } = require("express");
const apiRouter = require("./api");

const router = Router();

router.use("/main", apiRouter);

module.exports = router;
