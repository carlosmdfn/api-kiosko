const Categoria = require('../models/Categoria')

const getCategoria = async (req, res) => {
    const categorias = await Categorias.find();
    return res.json(categorias);
  };

const createCategoria = async(req, res) => {
    const { nombre } = req.body;
  
    try{
      const newCate= new Categoria({
        nombre,
      })
      await newCate.save();
      return res.status(201).json(newCate);
    }catch{
      console.log(error);
    }
  };

const getCategoriaById = async (req, res) => {
    const { categoriaId } = req.params;
  
    const categoria = await Categoria.findById(categoriaId);
    res.status(200).json(categoria);
};

const updateCategoriatById = async (req, res) => {
    const updatedCategoria = await Categoria.findByIdAndUpdate(
      req.params.categoriaId,
      req.body,
      {
        new: true,
      }
    );
    res.status(204).json(updatedCategoria);
};

const deleteCategoriaById = async (req, res) => {
    const { categoriaId } = req.params;
  
    await Categoria.findByIdAndDelete(categoriaId);
  
    // code 200 is ok too
    res.status(204).json();
};

module.exports = {
    getCategoria,
    createCategoria,
    getCategoriaById,
    updateCategoriatById,
    deleteCategoriaById,
}