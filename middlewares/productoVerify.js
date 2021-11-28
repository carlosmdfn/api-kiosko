const Proveedor = require("./../models/Proveedor");


const checkProveedorExisted = async (req, res, next) => {
    try {
        const proveedor = await Proveedor.findOne({ ruc: req.body.proveedor });
        if (!proveedor)return res.status(400).json({ message: "El proveedor no existe" });
          next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = {
    checkProveedorExisted,
}