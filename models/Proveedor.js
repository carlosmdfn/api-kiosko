const { Schema, model } = require('mongoose');

const proveedorSchema = new Schema(
    {
    nombre : String,
    direccion : String,
    telefono : String,
    ruc: String,
    }
);

module.exports =  model("Proveedor", proveedorSchema);

