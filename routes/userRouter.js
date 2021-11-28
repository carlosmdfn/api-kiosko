const { Router } = require('express');
const router = Router();

const usersCtrl = require("../controllers/user.controller");
const authJwt = require("../middlewares/authJwt");
const verifySignup = require("../middlewares/verifySignup")

router.post(
    "/",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      verifySignup.checkDuplicateUsernameOrEmail,
    ],
    usersCtrl.createUser
  );

module.exports = router;