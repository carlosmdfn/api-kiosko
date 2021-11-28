const { Schema, model } = require('mongoose');

const categoriaSchema = new Schema(
    {
    nombre : String,
    }
);

module.exports =  model("Categoria", categoriaSchema);