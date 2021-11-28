const { Router } = require('express');
const router = Router();

const productsCtrl = require('../controllers/producto.controller');
const authJwt = require('../middlewares/authJwt');
const productoVerify = require('../middlewares/productoVerify')

router.get("/", [authJwt.verifyToken], productsCtrl.getProducts);

router.get("/:productId", [authJwt.verifyToken], productsCtrl.getProductById);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  productsCtrl.createProduct
);

router.put(
  "/:productId",
  [authJwt.verifyToken, authJwt.isModerator],
  productsCtrl.updateProductById
);

router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.deleteProductById
);

module.exports = router;