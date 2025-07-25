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
router.get("/users",
  [
    query("limit", "The limit must be a number")
      .isNumeric()
      .optional(),
    query("from", "The starting value must be a number")
      .isNumeric()
      .optional(),
    validateFields,
  ],
  getUsers);

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
    //Los roles es importante validarlos contra la DB con un helper(db-validator), creando una nueva Collection(MongoCompas) y un modelo(Schema)
    check("role").custom(validateRole),
    // check("role", "Enter a valid role").isIn(["ADMIN", "USER"]), otra forma de hacerlo
    validateFields, //funcion para validar los campos verificar que la info se recibe como se necesita
  ],
  postUsers
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole, //Este middleware fuerza a que el usuario debe ser ADMIN para poder hacer cambios
    hasRoles("ADMIN", "SALES"), //Verifica que el rol del usuario sea uno de estos roles,que estamos especificando
    check("id", "It's not a valid Id").isMongoId(),
    check("id").custom(userExists),
    validateFields,
  ],
  deleteUsers
);

module.exports = router;
