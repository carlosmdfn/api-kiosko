const Compra = require("./../models/Compra");
const Producto = require("./../models/Producto");

let guardar = async (req, res) => {

    let body = req.body;

    validar_cantidad(body.productos_detalle, (respuesta) => {

        if (respuesta == false)
            return res.json({
                ok: false,
                mensaje: "No hay productos para guardar"
            });


        let compra = new Compra({
            valor_total: body.total,
            productos: respuesta
        });

        compra.save((err, compraNew) => {

            if (err)
                return res.json({
                    ok: false,
                    err
                });

            res.json({
                ok: true,
                compraNew
            });
        })
    })


}

let validar_cantidad = async (productos, callback) => {

    let productos_id = [];
    productos.forEach(element => {
        productos_id.push(element.producto_id);
    });

    let respuesta = [];

    Producto.find({})
        .where("_id").in(productos_id)
        .exec(async (err, data) => {

            for(let i = 0; i < data.length; i++){

                let cantidad = productos.find(p => p.producto_id == data[i]._id).cantidad;

                    cantidad_nueva = Number(data[i].cantidad) + Number(cantidad);

                    let modifico = await Producto.findByIdAndUpdate(data[i]._id, {
                        cantidad: cantidad_nueva
                    });

                    if (modifico != false) {
                        respuesta.push({
                            producto: data[i]._id,
                            cantidad: cantidad
                        });
                    }
            }

            callback(respuesta.length == 0 ? false : respuesta);

        })
}

const listar = async (req, res) => {
    const compra = await Compra.find().populate("productos.producto");
    return res.json(compra);
}

const getCompraaById = async (req, res) => {
    const { compraId } = req.params;
    
    const compra = await Compra.findById(compraId).populate("productos.producto");
    res.status(200).json(compra);
  };

module.exports = {
    guardar,
    listar,
    getCompraaById
}