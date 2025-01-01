const { response } = require("express");
const bcryptjs = require("bcryptjs");

const UserModel = require("../models/User.model");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    // const googleUser = await googleVerify(id_token);
    const { name, email, picture } = await googleVerify(id_token);

    const user = await UserModel.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ":P",
        img,
        google: true,
      };

      const newUser = new UserModel(data);
      await newUser.save();
    }

    //Si el usuario existe y tiene el status en false
    if (!user.status) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    json.status(400).json({
      msg: false,
      msg: "Token could not be verified",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
