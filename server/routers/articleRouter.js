
function routerFunction() {
    // router define
    const articleRouter = require("express").Router();

    // Espace to add a midleware
    articleRouter.use((req,res,next)=>{
        next();
    });
    // controller import
    const { 
        articleGet, articlePost, articleDeleteMany,
        articlePut, articlePatch, articleDeleteOne
    
    } = require("./../controllers/articleController");

    // HTTP METHODS, AND REPONSE
    articleRouter.route("/")
        .get(articleGet)
        .post(articlePost)
        .delete(articleDeleteMany)
    ;
        // particular id
    articleRouter.route("/:articleId")
        .get(articleGet)
        .put(articlePut)
        .patch(articlePatch)
        .delete(articleDeleteOne)
    ;   
    
    return articleRouter;
};

module.exports = routerFunction;