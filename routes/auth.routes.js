const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
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

module.exports = router;
