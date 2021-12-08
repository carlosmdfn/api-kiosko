const { Router } = require('express');
const router = Router();

const proveedorCtrl = require("./../controllers/proveedor.controller");
const authJwt = require('../middlewares/authJwt');

router.get("/", [authJwt.verifyToken, authJwt.isModerator], proveedorCtrl.getProveedor);
router.get("/:proveedorId", [authJwt.verifyToken], proveedorCtrl.getProveedorById);
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], proveedorCtrl.createProveedor);
router.put("/:proveedorId",[authJwt.verifyToken, authJwt.isAdmin], proveedorCtrl.updateProveedortById);
router.delete("/:proveedorId", [authJwt.verifyToken, authJwt.isAdmin], proveedorCtrl.deleteProveedorById);

module.exports = router;