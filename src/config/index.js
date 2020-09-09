const { request } = require("../middlewares");

module.exports = (app) => {
 app.use(request);
 return app;
};
