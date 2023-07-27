
// const { cliente } = require("../models/clienteModel");
const { MyError, defaultError } = require("../utils/customErrors");

function clienteGet(req,res,next) {
    let clientes = [
        {
            id: "abc123",
            nombres: "Yeison",
            apellidos: "Gómez",
            direccion: "Joyabaj",
            telefono: "32568978",
            email: "yeison@gmail.com",
        },
        {
            id: "abc124",
            nombres: "Ricardo",
            apellidos: "Hernández",
            direccion: "San Andrés Sajcabajá",
            telefono: "42090991",
            email: "ricardo@gmail.com",
        },
        {
            id: "abc125",
            nombres: "Yohana",
            apellidos: "Gómez",
            direccion: "Santa Cruz",
            telefono: "78458945",
            email: "yohana@gmail.com",
        },
        {
            id: "abc125",
            nombres: "Willi",
            apellidos: "Gómez",
            direccion: "Santa Cruz",
            telefono: "78458945",
            email: "willi@gmail.com",
        }
    ]
    // const query = (req.params.clienteId) ? {_id : req.params.clienteId} : {};
    
    // cliente.read(query)
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
    //             msg:"cliente not found, invalid ID",
    //             data: [],
    //         });
    //     }else{
    //         res.json(defaultError(err));
    //     };
    // });
    console.log(req.params.clienteId);
    if (req.params.clienteId){
        let data = "User not found";

        clientes.forEach(cliente => {
            if (cliente.id === req.params.clienteId){
                data = cliente;
            };
        });

        res.json({
            httpStatus: 200,
                message: "ServerMessage",
                data: data
        });
    }else{
        res.json({
            httpStatus: 200,
                message: "ServerMessage",
                data: clientes
        });
    };

};

function clientePost(req, res, next){
    // cliente.create({
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
        {1:"cliente POST reached"}
    ]
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

async function clientePut(req, res, next) {

    // const [conditions, document] = [{_id : req.params.clienteId} , req.body];
    // let toSend = {
    //     error:0,
    //     status:200,
    // };

    // try {            
    //     if (Object.keys(document).length == 0){
    //         throw(new MyError("No title or content sended","EmptyData"));
    //     };

    //     let response = await cliente.put(conditions, document);
        
    //     toSend.msg = (response.matchedCount > 0) ? "cliente updated successufully" : "Any cliente matched, any change did";
    //     toSend.data = response;
    // } catch (error) {
    //     if(error.name == "CastError" && query._id ){
    //         toSend.error = "InvalidId";
    //         toSend.msg = "cliente not found, invalid ID";
    //     }else{
    //         Object.assign(toSend,defaultError(error)); // asign the default atributes to Send
    //     };
    // };

    // res.json(toSend);
    res.json({
        httpStatus: 200,
        message: "ServerMessage",
        data: [
            {1:"cliente PUT reached"}
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
    clientePut, clientePatch, clienteDeleteOne
};

