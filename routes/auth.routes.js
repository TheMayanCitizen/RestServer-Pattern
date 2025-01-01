const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
    validateFields,
  ],
  login
);
router.post(
  "/google",
  [
    check("id_token", "Google verification is needed").notEmpty(),

    validateFields,
  ],
  googleSignIn
);

module.exports = router;
