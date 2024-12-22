const { validationResult } = require("express-validator");

const validateFields = (req, res, nex) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  nex();
};

module.exports = { validateFields };
