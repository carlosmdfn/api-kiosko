const { Router } = require('express');
const router = Router();

const authJwt = require('../middlewares/authJwt');
const compratrl = require('../controllers/compra.controller');

router.post(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    compratrl.guardar
);

router.get(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    compratrl.listar
);

module.exports = router;