const { Router } = require('express');
const router = Router();

const categoriaCtrl = require("../controllers/categoria.controller");
const authJwt = require('../middlewares/authJwt');

router.get("/", [authJwt.verifyToken], categoriaCtrl.getCategoria);
router.get("/:categoriaId", [authJwt.verifyToken], categoriaCtrl.getCategoriaById);
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], categoriaCtrl.createCategoria);
router.put("/:categoriaId",[authJwt.verifyToken, authJwt.isAdmin], categoriaCtrl.updateCategoriatById);
router.delete("/categoriaId", [authJwt.verifyToken, authJwt.isAdmin], categoriaCtrl.deleteCategoriaById);

module.exports = router;