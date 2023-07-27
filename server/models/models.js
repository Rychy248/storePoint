const { DataTypes, Model } = require('sequelize');
const { sequelize } = require("../db");

const cliente = sequelize.define('cliente', {
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

const producto = sequelize.define('producto', {
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
        type: DataTypes.DECIMAL(6,2),
    }
});

const venta = sequelize.define('venta', {
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

const ventaProducto = sequelize.define('ventaProducto', {
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
});

// asociation
cliente.hasMany(venta);
venta.belongsTo(cliente,{
    foreignKey: 'clienteId'
});

venta.hasMany(ventaProducto);
ventaProducto.belongsTo(venta,{
    foreignKey: 'ventaId'
});

producto.hasMany(ventaProducto);
ventaProducto.belongsTo(producto,{
    foreignKey: 'productoId'
});

// create the table (s) with sync
sequelize.sync().then(() => {
   console.log('Tables created successfully!');   
}).catch((error) => {
    console.error('Unable to create table : ', error);
});


module.exports = { cliente, producto, venta, ventaProducto}