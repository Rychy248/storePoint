
function routerFunction() {
    // router define
    const clienteRouter = require("express").Router();

    // Espace to add a midleware
    clienteRouter.use((req,res,next)=>{
        next();
    });
    // controller import
    const { 
        clienteGet, clientePost, clienteDeleteMany,
        clientePatch, clienteDeleteOne
    
    } = require("../controllers/clienteController");

    // HTTP METHODS, AND REPONSE
    clienteRouter.route("/")
        .get(clienteGet)
        .post(clientePost)
        .delete(clienteDeleteMany)
    ;
        // particular id
    clienteRouter.route("/:clienteId")
        .get(clienteGet)
        .patch(clientePatch)
        .delete(clienteDeleteOne)
    ;   
    
    return clienteRouter;
};

module.exports = routerFunction;