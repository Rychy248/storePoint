
require('dotenv').config()

const appPort = 3000;
const { express, app } = require("./config");
require("./routers/urls")(app);
require("./db")(app);

// SET UP THE APP