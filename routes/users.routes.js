const { Router } = require("express");
const { check } = require("express-validator");

// const { validateFields } = require("../middlewares/validateFields");
// const { validateJWT } = require("../middlewares/validate-jwt");
// const { isAdminRole, hasRoles } = require("../middlewares/validate-roles");

const {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRoles,
} = require("../middlewares");

const {
  validateRole,
  emailExist,
  userExists,
} = require("../helpers/db-validators");

const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
} = require("../controllers/users.controller");

const router = Router();

// router.get("/:id", getUsers);
router.get("/users", getUsers);

router.put(
  "/:id",
  [
    check("id", "It's not a valid Id").isMongoId(),
    check("id").custom(userExists),
    check("role").custom(validateRole),
    validateFields,
  ],
  putUsers
);

router.post(
  "/",
  [
    check("name", "Name must be provided").not().isEmpty(),
    check("password", "Password must contain at least 6 letters").isLength({
      min: 6,
    }),
    check("email", "Invalid emal").isEmail(),
    check("email").custom(emailExist),
    check("role").custom(validateRole),
    // check("role", "Enter a valid role").isIn(["ADMIN", "USER"]), otra forma de hacerlo
    validateFields, //funcion para validar los campos
  ],
  postUsers
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole, //Verifica estrictamente que  user.role sea un role de ADMIN
    hasRoles("ADMIN", "SALES"), //Verifica que user.rol sea uno de estos roles
    check("id", "It's not a valid Id").isMongoId(),
    check("id").custom(userExists),
    validateFields,
  ],
  deleteUsers
);

module.exports = router;
