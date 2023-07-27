
// --------------------- IMPORTING  AND SETTING---------------------
const 
// Local modules
    path = require('path'),
// Third part modules 
    express = require("express"),
    bodyParser = require('body-parser'),
    cors = require('cors'),
// general config
    dbSettings = {
        dbName :"storepoint",
        dbHost: "127.0.0.1",
        dbDialect: "mysql" 
    },
    appSettings = {
        port:3000
    },
// create app
    app = express(),
// Allowed origin for cors util
    allowedOrigins = "*";
;
// -------- MIDLEWARE
// app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
    // cors midleware
app.use(cors({origin: allowedOrigins}));
// MODIFY THE JSON PARSER
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


module.exports = { app, dbSettings, appSettings}
