const { Venta, VentaProducto, Cliente, Producto, sequelize} = require("../models/models");
const { MyError, defaultError } = require("../utils/customErrors");

async function prettierProducto(ventaProducto) {
    // ventaId, productoId, cantidad
    let prettieProduct ={
        cantidad : ventaProducto.cantidad,
    };

    const producto = await Producto.findByPk(ventaProducto.productoId);
    prettieProduct.producto = {
        nombre: producto.nombre, 
        descripcion: producto.descripcion,
        precio: producto.precio,
    };
    return prettieProduct;
};

async function prettierVenta(venta) {
    let prettieSale = {
        id: venta.id,
        fecha : venta.fecha,
        totalVenta : parseFloat(0.00),
        productos : []
    };

    //get cliente
    const cliente = await Cliente.findByPk(venta.clienteId);
    prettieSale.cliente = {
        id : cliente.id,
        nombres : cliente.nombres,
        apellidos : cliente.apellidos,
        direccion : cliente.direccion,
        telefono : cliente.telefono,
        email : cliente.email
    }
    // get productos
    const ventaProductos = await VentaProducto.findAll({where:{ ventaId:venta.id }});

    for (let i = 0; i < ventaProductos.length; i++) {
        const producto = await prettierProducto(ventaProductos[i]);
        prettieSale.totalVenta = prettieSale.totalVenta + (parseFloat(producto.cantidad) * parseFloat(producto.producto.precio));
        prettieSale.productos.push(producto);
    }

    return prettieSale;
};

async function ventaGet(req,res,next) {
    try {
        let queryParams ={};
        if (req.params.ventaId)queryParams.where = {id: req.params.ventaId};

        // get ventas
        const aufulVentas = await Venta.findAll(queryParams)
        let ventas = []
        
        // Reformat all venta data, prettier format
        for (let i = 0; i < aufulVentas.length; i++) {
            ventas.push( await prettierVenta(aufulVentas[i]))
        };

        let msgToSend = (req.params.ventaId && ventas.length == 0) ? 
        "Venta no encontrada": (!req.params.ventaId && ventas.length == 0) ? 
        "Ningúna venta se ha ingresado" : (req.params.ventaId) ?
        "Venta econtrada": "Todos las ventas retornados";
            
        return res.status(200).json({
            error:0,
            status:200,
            msg:msgToSend,
            data:ventas
        });
    } catch (error) {
        return res.json(defaultError(err));
    };
    
};

/**
 * Need in the req.body to params
 * clienteId as an string, and
 * productos as an array of Obj [{productoId, cantidad}]
 */
async function ventaPost(req, res, next){
    const { clienteId, productos, ... extraFields} = req.body;
    const validFields = ["clienteId", "productos"];

    //VALIDATIONS
    //any extra field sended
    if(Object.keys(extraFields).length > 0){
        return res.status(402).json({
            error:1,
            status:402,
            msg:"Bad arguments!",
            errDetails: {
                badlyFieldsSended: extraFields,
                validFields: validFields.join(", "),
              },
        });
    };
    //all fields sended
    if(!clienteId || !productos){
        return res.status(402).json({
            err:1,
            httpStatus: 402,
            message: "Bad Arguments, missed some fild",
        });    
    };
    //min one product
    if(productos.length == 0){
        return res.status(402).json({
            err:1,
            httpStatus: 402,
            message: "Any Product Sended",
        });    
    };
    // valid cliente
    const cliente = await Cliente.findByPk(clienteId);
    if(!cliente){
        return res.status(402).json({
            error:1,
            status:402,
            msg:"Cliente Id, Enviado no es valido"
        });
    };
    //valid productos
    for (let i = 0; i < productos.length; i++) {
        const producto = await Producto.findByPk(productos[i].productoId);
        if (!producto || !productos[i].cantidad) {
            return res.status(402).json({
                error:1,
                status:402,
                msg:(producto)? "Cantidad de producto no enviada":`Producto Id enviado no validdo (ID Searched for: ${productos[i].productoId})`
            }); 
        };
    }

    // ALL RIGHT, GO TO SAVE THE DATA---------------
    // First, we start a transaction from your connection and save it into a variable
    const transaction = await sequelize.transaction();

    try {
        // Then, we do some calls passing this transaction as an option:
        //create the Venta
        const venta = await Venta.create({
            clienteId: req.body.clienteId,
        }, { transaction: transaction });
        
        //crea los datos para la tabla VentaProducto
        let productosToSave = [];
        req.body.productos.forEach(producto => {
            productosToSave.push({
                ventaId:venta.id,
                productoId:producto.productoId,
                cantidad:producto.cantidad
            });
        });

        // Genera Registros
        const ventaProductos = await VentaProducto.bulkCreate( productosToSave, { transaction: transaction });
        
        // If the execution reaches this line, no errors were thrown.
        // We commit the transaction.   
        await transaction.commit();

        return res.json({
            error:0,
            status:200,
            msg:"Venta registrada correctamente",
            data:{
                venta:venta,
                ventaProductos:ventaProductos
            }
        });
        
    } catch (error) {
        // If the execution reaches this line, an error was thrown.
        // We rollback the transaction.
        await transaction.rollback();
        return res.json(defaultError(error));
    };
};

function ventaDeleteMany(req, res, next){
    // venta.deleteMany({})
    // .then((response)=>{
    //     res.json({
    //         error:0,
    //         status: 200,
    //         msg:"All ventas deleted succesfully",
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
        {1:"venta DELETE MANY reached"}
    ]
});
};

function ventaDeleteOne(req, res, next){
    // venta.deleteOne({_id : req.params.ventaId})
    // .then((response)=>{
    //     if (response.deletedCount == 0){
    //         res.json({
    //             error:0,
    //             status: 200,
    //             msg:`venta NOT FOUND`,
    //             data:response,
    //         });
    //     }else{
    //         res.json({
    //             error:0,
    //             status: 200,
    //             msg:`venta was deleted succesfully`,
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
        {1:"venta DELETE ONE reached"}
    ]
});
};

async function ventaPatch(req,res,next){
    const validFields = ["nombre", "descripcion", "precio","stock"];
    const venta = await Venta.findByPk(req.params.ventaId);
    const {nombre, descripcion, precio, stock, ... extraFields} = req.body; 
    
    if((!nombre && !descripcion && !precio) || !venta){
        return res.status(402).json({
            err:1,
            httpStatus: 402,
            message: (!venta)? "Venta Id invalid" : "Bad Arguments, any field sended",
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
    
    venta.update(updatedFields)
    .then(resultOf =>{
        res.status(200).json({
            error:0,
            status:200,
            msg:"Venta actualizado correctamente",
            data:resultOf
        });
    })
    .catch(err=>{
        res.json(defaultError(err));
    });
    
};
  

module.exports =  {
    ventaGet, ventaPost, ventaDeleteMany,
    ventaPatch, ventaDeleteOne
};


