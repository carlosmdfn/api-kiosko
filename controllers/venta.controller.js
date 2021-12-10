const Venta = require("./../models/Venta");
const Producto = require("./../models/Producto");

let guardar = async (req, res) => {

    let body = req.body;
    console.log(body.productos_detalle)

    validar_cantidad(body.productos_detalle, (respuesta) => {

        if (respuesta == false)
            return res.json({
                ok: false,
                mensaje: "No hay productos para guardar"
            });


        let venta = new Venta({
            fecha: body.fecha,
            valor_total: body.total,
            productos: respuesta
        });

        venta.save((err, ventaNew) => {

            if (err)
                return res.json({
                    ok: false,
                    err
                });

            res.json({
                ok: true,
                ventaNew
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

                if (cantidad <= data[i].cantidad) {

                    cantidad_nueva = data[i].cantidad - cantidad;

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
            }

            callback(respuesta.length == 0 ? false : respuesta);

        })
}

const listar = async (req, res) => {
    const venta = await Venta.find().populate("productos.producto");
    return res.json(venta);
}

const getVentaById = async (req, res) => {
    const { ventaId } = req.params;
    
    const venta = await Venta.findById(ventaId).populate("productos.producto");
    res.status(200).json(venta);
  };

module.exports = {
    guardar,
    listar,
    getVentaById
}