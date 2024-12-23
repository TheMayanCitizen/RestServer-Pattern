const { response } = require("express");
const bcryptjs = require("bcryptjs");

const UserModel = require("../models/User.model");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  //Verificar si el usuario existe
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      msg: "User / Password are not valid - email",
    });
  }
  //Si el usuario esta activo
  if (user.status) {
    //Si el status esta en true, significa que fue dado de baja.
    return res.status(400).json({
      msg: "User / Password are not valid - status: true",
    });
  }

  //Verificar la password
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "User / Password are not valid - password",
    });
  }

  //Generar el JWT

  const token = await generateJWT(user.id);

  res.json({
    msj: "Ok",
    user,
    token,
  });
};

module.exports = {
  login,
};
