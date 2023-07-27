
// const { article } = require("../models/articleModel");
const { MyError, defaultError } = require("../utils/customErrors");

function articleGet(req,res,next) {
    // const query = (req.params.articleId) ? {_id : req.params.articleId} : {};

    // article.read(query)
    // .then((response) => {
    //     res.json({
    //         error:0,
    //         status:200,
    //         data:response,
    //     });
    // })
    // .catch((err) => {
    //     if(err.name == "CastError" && query._id ){
    //         res.json({
    //             error:"InvalidId",
    //             status:200,
    //             msg:"Article not found, invalid ID",
    //             data: [],
    //         });
    //     }else{
    //         res.json(defaultError(err));
    //     };
    // });
    res.json({
        httpStatus: 200,
            message: "ServerMessage",
            data: [
            {1:"Article GET reached"}
        ]
    });

};

function articlePost(req, res, next){
    // article.create({
    //     title:req.body.title,
    //     content:req.body.content
    // })
    // .then((response)=>{
    //     res.json({
    //         error:0,
    //         status:200,
    //         msg:"Succesfull posted",
    //         data:response
    //     });
    // })
    // .catch((err) => {
    //     res.json(defaultError(err));
    // });
    res.json({
        httpStatus: 200,
        message: "ServerMessage",
        data: [
        {1:"Article POST reached"}
    ]
});
};

function articleDeleteMany(req, res, next){
    // article.deleteMany({})
    // .then((response)=>{
    //     res.json({
    //         error:0,
    //         status: 200,
    //         msg:"All articles deleted succesfully",
    //         data:response,
    //     });
    // })
    // .catch((err)=>{
    //     res.json(defaultError(err));
    // });
    res.json({
        httpStatus: 200,
        message: "ServerMessage",
        data: [
        {1:"Article DELETE MANY reached"}
    ]
});
};

function articleDeleteOne(req, res, next){
    // article.deleteOne({_id : req.params.articleId})
    // .then((response)=>{
    //     if (response.deletedCount == 0){
    //         res.json({
    //             error:0,
    //             status: 200,
    //             msg:`Article NOT FOUND`,
    //             data:response,
    //         });
    //     }else{
    //         res.json({
    //             error:0,
    //             status: 200,
    //             msg:`Article was deleted succesfully`,
    //             data:response,
    //         });
    //     };
    // })
    // .catch((err)=>{
    //     res.json(defaultError(err));
    // });
    res.json({
        httpStatus: statusCode,
        message: "ServerMessage",
        data: [
        {1:"Article DELETE ONE reached"}
    ]
});
};

async function articlePut(req, res, next) {

    // const [conditions, document] = [{_id : req.params.articleId} , req.body];
    // let toSend = {
    //     error:0,
    //     status:200,
    // };

    // try {            
    //     if (Object.keys(document).length == 0){
    //         throw(new MyError("No title or content sended","EmptyData"));
    //     };

    //     let response = await article.put(conditions, document);
        
    //     toSend.msg = (response.matchedCount > 0) ? "Article updated successufully" : "Any article matched, any change did";
    //     toSend.data = response;
    // } catch (error) {
    //     if(error.name == "CastError" && query._id ){
    //         toSend.error = "InvalidId";
    //         toSend.msg = "Article not found, invalid ID";
    //     }else{
    //         Object.assign(toSend,defaultError(error)); // asign the default atributes to Send
    //     };
    // };

    // res.json(toSend);
    res.json({
        httpStatus: 200,
        message: "ServerMessage",
        data: [
            {1:"Article PUT reached"}
        ]
    });
};

function articlePatch(req,res,next){
    // const [conditions, updates] = [{_id : req.params.articleId} , req.body];
    
    // if (Object.keys(updates).length == 0){
    //     res.json(
    //         defaultError(new MyError("No title or content sended","EmptyData"))
    //     );
    // }else{
    //     article.patch(conditions, updates)
    //     .then((response)=>{
    //         res.json({
    //             error:0,
    //             status:200,
    //             msg : (response.matchedCount > 0) ? "Article updated successufully" : "Any article matched, any change did",
    //             data : response,
    //         });
    //     })
    //     .catch((err)=>{
    //         if(err.name == "CastError" && query._id ){
    //             res.json({
    //                 error:"InvalidId",
    //                 status:200,
    //                 msg :"Article not found, invalid ID",
    //                 data : response,
    //             });
    //         }else{
    //             res.json(defaultError(err));
    //         };
    //     });
    // };
    res.json({
        httpStatus: 200,
        message: "ServerMessage",
        data: [
            {1:"Article PATCH reached"}
        ]
    });
};

module.exports =  {
    articleGet, articlePost, articleDeleteMany,
    articlePut, articlePatch, articleDeleteOne
};

