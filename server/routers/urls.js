
/**
 * 
 * @param { express.app } app the core app
 */
function urlFunction(app) {
    app.use("/cliente", require("./clienteRouter")());
    app.use("/producto", require("./productoRouter")());
    app.use("/venta", require("./ventaRouter")());
};

module.exports = urlFunction;