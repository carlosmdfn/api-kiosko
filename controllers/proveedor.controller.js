const Proveedor = require("../models/Proveedor");

const getProveedor = async (req, res) => {
    const proveedores = await Proveedor.find();
    return res.json(proveedores);
  };

const createProveedor = async(req, res) => {
  const { nombre, direccion, telefono, ruc } = req.body;

  try{
    const newProvee = new Proveedor({
      nombre,
      direccion,
      telefono,
      ruc
    })
    await newProvee.save();
    return res.status(201).json(newProvee);
  }catch{
    console.log(error);
  }
}

const getProveedorById = async (req, res) => {
  const { proveedorId } = req.params;

  const proveedor = await Proveedor.findById(proveedorId);
  res.status(200).json(proveedor);
};

const updateProveedortById = async (req, res) => {
  const updatedProveedor = await Proveedor.findByIdAndUpdate(
    req.params.proveedorId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedProveedor);
};

const deleteProveedorById = async (req, res) => {
  const { proveedorId } = req.params;

  await Proveedor.findByIdAndDelete(proveedorId);

  // code 200 is ok too
  res.status(204).json();
};


module.exports = {
    getProveedor,
    createProveedor,
    getProveedorById,
    updateProveedortById,
    deleteProveedorById
}