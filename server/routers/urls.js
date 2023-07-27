
/**
 * 
 * @param { express.app } app the core app
 */
function urlFunction(app) {
    app.use("/cliente", require("./clienteRouter")());
    app.use("/producto", require("./productoRouter")());
};

module.exports = urlFunction;