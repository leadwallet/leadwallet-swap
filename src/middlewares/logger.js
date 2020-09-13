const debug = require("debug");
const chalk = require("chalk");

const log = debug("logging");

module.exports = (req, res, next) => {
 let text = null;
 if (res.statusCode >= 200 && res.statusCode <= 299)
  text = chalk.green;
 if (res.statusCode >= 300 && res.statusCode <= 399)
  text = chalk.greenBright;
 if (res.statusCode >= 400 && res.statusCode <= 499)
  text = chalk.yellow;
 if (res.statusCode >= 500)
  text = chalk.red;
 
 log(`${req.path} ++++++++++++++ ${text(res.statusCode)}`);
 next();
};