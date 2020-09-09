const dotenv = require("dotenv");

dotenv.config();

module.exports.CHANGENOW_API = process.env.CHANGENOW;
module.exports.CHANGENOW_API_KEY = process.env.CHANGENOW_API_KEY;
