const { Router } = require('express');
const router = Router();

const authJwt = require('../middlewares/authJwt');
const ventaCtrl = require('../controllers/venta.controller');

router.post(
    "/",
    [authJwt.verifyToken, authJwt.isModerator],
    ventaCtrl.guardar
);

router.get(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    ventaCtrl.listar
);

module.exports = router;