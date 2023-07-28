const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../db");

const Cliente = sequelize.define('cliente', {
    // Model attributes are defined here
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
    }, {
    // Other model options go here
});

const Producto = sequelize.define('producto', {
    // Model attributes are defined here
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    precio:{
        type: DataTypes.DECIMAL(8,2),
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 1000
    }
});

const Venta = sequelize.define('venta', {
    // Model attributes are defined here
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

const VentaProducto = sequelize.define('ventaProducto', {
    // Model attributes are defined here
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ventaId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad:{
        type: DataTypes.INTEGER,
        defaultValue: 1 
    }
});

// asociation
Cliente.hasMany(Venta);
Venta.belongsTo(Cliente,{
    foreignKey: 'clienteId'
});

Venta.hasMany(VentaProducto);
VentaProducto.belongsTo(Venta,{
    foreignKey: 'ventaId'
});

Producto.hasMany(VentaProducto);
VentaProducto.belongsTo(Producto,{
    foreignKey: 'productoId'
});

// create the table (s) with sync
sequelize.sync().then(() => {
   console.log('Tables created successfully!');   
}).catch((error) => {
    console.error('Unable to create table : ', error);
});


module.exports = { Cliente, Producto, Venta, VentaProducto, sequelize}