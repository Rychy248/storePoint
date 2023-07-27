// /**
//  * 
//  * @param { express.app } app 
//  */
// function dbConnect(app) {
//     // IMPORT settings
//     const { 
//         appSettings:{
//             port:appPort
//         },
//         dbSettings : {
//             dbName,
//             dbPort
//         }
//     } = require("./config");

//     // thirdy module; mongoose 
//     const mongoose = require("mongoose");

//     // Conecting to DB
//     mongoose.connect(`mongodb://127.0.0.1:${dbPort}/${dbName}`)
//     .then((msg)=>{
//         // CONNECTED MESSAGE
//         console.log(`MongoDB connected with Mongoose at port ${dbPort} to the ${dbName}`);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// };

// module.exports = dbConnect;