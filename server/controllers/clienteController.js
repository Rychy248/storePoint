

const { or } = require("sequelize");
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

async function clientePatch(req,res,next){
    console.log(req.body)
    
    const validFields = ["nombres", "apellidos", "direccion", "telefono", "email"];
    const cliente = await Cliente.findByPk(req.params.clienteId);
    const {nombres, apellidos, direccion, telefono, email, ... extraFields} = req.body; 
    
    if((!nombres && !apellidos && !direccion && !telefono && !email) || !cliente){
        return res.status(402).json({
            err:1,
            httpStatus: 402,
            message: (!cliente)? "Cliente Id invalid" : "Bad Arguments, any field sended",
        });    
    };
    console.log(extraFields);
    if(Object.keys(extraFields).length > 0){
        return res.status(402).json({
            err: 1,
            errDetails: {
              badlyFieldsSended: extraFields,
              validFields: validFields.join(", "),
            },
            httpStatus: 402,
            message: "Bad params Names!",
          });
    };
    
    const updatedFields = {};
    if (nombres) updatedFields.nombres = nombres;
    if (apellidos) updatedFields.apellidos = apellidos;
    if (direccion) updatedFields.direccion = direccion;
    if (telefono) updatedFields.telefono = telefono;
    if (email) updatedFields.email = email;
  
    
    cliente.update(updatedFields)
    .then(resultOf =>{
        console.log(resultOf);
        res.status(200).json({
            error:0,
            status:200,
            msg:"Cliente actualizado correctamente",
            data:resultOf
        });
    })
    .catch(err=>{
        res.json(defaultError(err));
    });
    
};
  

module.exports =  {
    clienteGet, clientePost, clienteDeleteMany,
    clientePatch, clienteDeleteOne
};

