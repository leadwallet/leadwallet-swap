const express = require("express");
const { request, logger } = require("../middlewares");
const router = require("../router");

module.exports = (app) => {
 app.use(express.json());
 app.use(express.urlencoded({
  extended: false
 }));
 app.use(logger);
 app.use(request);
 app.use("/api/v1", router);
 return app;
};
