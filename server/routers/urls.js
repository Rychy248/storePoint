
/**
 * 
 * @param { express.app } app the core app
 */
function urlFunction(app) {
    
    app.use("/articles", require("./articleRouter")());
    app.use("/cliente", require("./clienteRouter")());
};

module.exports = urlFunction;