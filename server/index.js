
require('dotenv').config()

const appPort = 3000;
const { express, app } = require("./config");
require("./db");

app.listen(appPort,(()=>{
    console.log(`App serverd at port ${appPort}`);
}));

require("./routers/urls")(app);

// SET UP THE APP