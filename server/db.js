
// IMPORT settings
const { 
    appSettings:{
        port:appPort
    },
    dbSettings : {
        dbName,
        dbHost,
        dbDialect
    }
} = require("./config");

// thirdy module; mongoose 
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
dbName,
`${process.env.dbUser}`,
`${process.env.dbPassword}`,
{
    host: dbHost,
    dialect: dbDialect
}
);

sequelize.authenticate()
.then(() => {
    console.log('Connection TO MYSQL has been established successfully.');
    
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


module.exports = { sequelize };