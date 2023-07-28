
function routerFunction() {
    // router define
    const ventaRouter = require("express").Router();

    // Espace to add a midleware
    ventaRouter.use((req,res,next)=>{
        next();
    });
    // controller import
    const { 
        ventaGet, ventaPost, ventaDeleteMany,
        ventaPatch, ventaDeleteOne
    
    } = require("../controllers/ventaController");

    // HTTP METHODS, AND REPONSE
    ventaRouter.route("/")
        .get(ventaGet)
        .post(ventaPost)
        .delete(ventaDeleteMany)
    ;
        // particular id
    ventaRouter.route("/:ventaId")
        .get(ventaGet)
        .patch(ventaPatch)
        .delete(ventaDeleteOne)
    ;   
    
    return ventaRouter;
};

module.exports = routerFunction;