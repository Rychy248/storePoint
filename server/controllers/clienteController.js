

const { Cliente } = require("../models/models");
const { MyError, defaultError } = require("../utils/customErrors");

async function clienteGet(req,res,next) {
    let queryParams = {}

    console.log(req.params.clienteId);
    
    if (req.params.clienteId){
        queryParams = {
            where: {
              id: req.params.clienteId
        }};
    };

    Cliente.findAll(queryParams)
    .then(clientes =>{
        console.log(clientes);
        let msgToSend = (req.params.clienteId && clientes.length == 0) ? 
        "Cliente no encontrado": (!req.params.clienteId && clientes.length == 0) ? 
        "Ningún cliente se ha ingresado" : (req.params.clienteId) ?
        "Cliente econtrado": "Todos los clientes retornados";
            
        res.json({
            error:0,
            status:200,
            msg:msgToSend,
            data:clientes
        });

    })
    .catch(err=>{
        res.json(defaultError(err));
    });
};

async function clientePost(req, res, next){
    
    Cliente.create({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email
    })
    .then((cliente)=>{
        res.json({
            error:0,
            status:200,
            msg:"Cliente creado correctamente",
            data:cliente
        });
    })
    .catch((err) => {
        res.json(defaultError(err));
    });
    
};

function clienteDeleteMany(req, res, next){
    // cliente.deleteMany({})
    // .then((response)=>{
    //     res.json({
    //         error:0,
    //         status: 200,
    //         msg:"All clientes deleted succesfully",
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
        {1:"cliente DELETE MANY reached"}
    ]
});
};

function clienteDeleteOne(req, res, next){
    // cliente.deleteOne({_id : req.params.clienteId})
    // .then((response)=>{
    //     if (response.deletedCount == 0){
    //         res.json({
    //             error:0,
    //             status: 200,
    //             msg:`cliente NOT FOUND`,
    //             data:response,
    //         });
    //     }else{
    //         res.json({
    //             error:0,
    //             status: 200,
    //             msg:`cliente was deleted succesfully`,
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
        {1:"cliente DELETE ONE reached"}
    ]
});
};

function clientePatch(req,res,next){
    // const [conditions, updates] = [{_id : req.params.clienteId} , req.body];
    
    // if (Object.keys(updates).length == 0){
    //     res.json(
    //         defaultError(new MyError("No title or content sended","EmptyData"))
    //     );
    // }else{
    //     cliente.patch(conditions, updates)
    //     .then((response)=>{
    //         res.json({
    //             error:0,
    //             status:200,
    //             msg : (response.matchedCount > 0) ? "cliente updated successufully" : "Any cliente matched, any change did",
    //             data : response,
    //         });
    //     })
    //     .catch((err)=>{
    //         if(err.name == "CastError" && query._id ){
    //             res.json({
    //                 error:"InvalidId",
    //                 status:200,
    //                 msg :"cliente not found, invalid ID",
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
            {1:"cliente PATCH reached"}
        ]
    });
};

module.exports =  {
    clienteGet, clientePost, clienteDeleteMany,
    clientePatch, clienteDeleteOne
};

