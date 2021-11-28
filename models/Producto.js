const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: String,
    categoria: [
      {
        type: Schema.Types.String,
        ref: "Categoria"
      },
    ],
    cantidad: Number,
    costo_venta: Number,
    costo_compra: Number,
    proveedor: [
      {
        type: Schema.Types.String,
        ref: "Proveedor"
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false
  },
);

module.exports =  model("Producto", productSchema);