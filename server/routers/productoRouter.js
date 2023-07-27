
function routerFunction() {
    // router define
    const productoRouter = require("express").Router();

    // Espace to add a midleware
    productoRouter.use((req,res,next)=>{
        next();
    });
    // controller import
    const { 
        productoGet, productoPost, productoDeleteMany,
        productoPatch, productoDeleteOne
    
    } = require("../controllers/productoController");

    // HTTP METHODS, AND REPONSE
    productoRouter.route("/")
        .get(productoGet)
        .post(productoPost)
        .delete(productoDeleteMany)
    ;
        // particular id
    productoRouter.route("/:productoId")
        .get(productoGet)
        .patch(productoPatch)
        .delete(productoDeleteOne)
    ;   
    
    return productoRouter;
};

module.exports = routerFunction;