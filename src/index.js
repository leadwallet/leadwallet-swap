const express = require("express");
let app = express();
const log = console.log;
const config = require("./config");

const port = parseInt(process.env.PORT || "7000");

app = config(app);

app.listen(port, () => {
 log(`Server is running on port ${port}`);
});

module.exports = app;
