const Product = require("../models/Producto");
const Proveedor = require("../models/Proveedor");

const createProduct = async (req, res) => {
  const { name, categoria, cantidad, costo_venta, costo_compra, proveedor } = req.body;
  const proveFound = await Proveedor.find({ ruc: { $in: proveedor } });

  try {
    const newProduct = new Product({
      name,
      categoria,
      cantidad,
      costo_venta,
      costo_compra,
      proveedor: proveFound.map((proveedor) => proveedor.nombre)
    })
      await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  res.status(200).json(product);
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  return res.json(products);
};

const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedProduct);
};

const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);

  // code 200 is ok too
  res.status(204).json();
};

module.exports = {
    createProduct,
    getProductById,
    updateProductById,
    getProducts,
    deleteProductById,
}