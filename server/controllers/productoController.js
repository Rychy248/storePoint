const { Producto } = require("../models/models");
const { MyError, defaultError } = require("../utils/customErrors");

async function productoGet(req,res,next) {
    let queryParams = {};
    
    if (req.params.productoId){
        queryParams = {
            where: {
              id: req.params.productoId
        }};
    };

    Producto.findAll(queryParams)
    .then(productos =>{
        let msgToSend = (req.params.productoId && productos.length == 0) ? 
        "Producto no encontrado": (!req.params.productoId && productos.length == 0) ? 
        "Ningún producto se ha ingresado" : (req.params.productoId) ?
        "Producto econtrado": "Todos los productos retornados";
            
        res.json({
            error:0,
            status:200,
            msg:msgToSend,
            data:productos
        });

    })
    .catch(err=>{
        res.json(defaultError(err));
    });
};

async function productoPost(req, res, next){
    
    Producto.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
    })
    .then((producto)=>{
        res.json({
            error:0,
            status:200,
            msg:"Producto creado correctamente",
            data:producto
        });
    })
    .catch((err) => {
        res.json(defaultError(err));
    });
    
};

function productoDeleteMany(req, res, next){
    // producto.deleteMany({})
    // .then((response)=>{
    //     res.json({
    //         error:0,
    //         status: 200,
    //         msg:"All productos deleted succesfully",
    //         data:response,
    //     });
    // })
    // .catch((err)=>{
    //     res.json(defaultError(err));
    // });
    res.status(200).json({
        err:0,
        httpStatus: 200,
        message: "Method not implemented",
        data: [
        {1:"producto DELETE MANY reached"}
    ]
});
};

function productoDeleteOne(req, res, next){
    // producto.deleteOne({_id : req.params.productoId})
    // .then((response)=>{
    //     if (response.deletedCount == 0){
    //         res.json({
    //             error:0,
    //             status: 200,
    //             msg:`producto NOT FOUND`,
    //             data:response,
    //         });
    //     }else{
    //         res.json({
    //             error:0,
    //             status: 200,
    //             msg:`producto was deleted succesfully`,
    //             data:response,
    //         });
    //     };
    // })
    // .catch((err)=>{
    //     res.json(defaultError(err));
    // });
    res.status(200).json({
        err:1,
        httpStatus: 200,
        message: "Method not implemented",
        data: [
        {1:"producto DELETE ONE reached"}
    ]
});
};

async function productoPatch(req,res,next){
    const validFields = ["nombre", "descripcion", "precio","stock"];
    const producto = await Producto.findByPk(req.params.productoId);
    const {nombre, descripcion, precio, stock, ... extraFields} = req.body; 
    
    if((!nombre && !descripcion && !precio) || !producto){
        return res.status(402).json({
            err:1,
            httpStatus: 402,
            message: (!producto)? "Producto Id invalid" : "Bad Arguments, any field sended",
        });    
    };
    
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
    if (nombre) updatedFields.nombre = nombre;
    if (descripcion) updatedFields.descripcion = descripcion;
    if (precio) updatedFields.precio = precio;
    if (stock) updatedFields.stock = stock;
    
    producto.update(updatedFields)
    .then(resultOf =>{
        res.status(200).json({
            error:0,
            status:200,
            msg:"Producto actualizado correctamente",
            data:resultOf
        });
    })
    .catch(err=>{
        res.json(defaultError(err));
    });
    
};
  

module.exports =  {
    productoGet, productoPost, productoDeleteMany,
    productoPatch, productoDeleteOne
};

