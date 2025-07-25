const { validationResult } = require("express-validator");

const validateFields = (req, res, nex) => {
  //Con esta funcion verificamos si validationResult tiene o no tiene errores. Si los hay entonces la informacion enviada del front esta incorrecta
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  //La funcion next nos permite continuar con el flujo del programa si todo salio bien(sin errores)
  nex();
};

module.exports = { validateFields };
