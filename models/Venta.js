const { Schema, model } = require("mongoose");

const ventaSchema = new Schema (
{
    fecha: {
        type: Date,
        default: Date.now
    },
    valor_total: Number,
    productos: [{
        producto : {
            type: Schema.ObjectId,
            ref: "Producto"
        },
        cantidad : Number
    }]
});

module.exports = model("Venta", ventaSchema);