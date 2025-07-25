const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.model");

const validateJWT = async (req = request, resp = response, next) => {
  //leyendo los header donde viene el token, "x-token es el nombre que le pusimon en los headers de postman"
  const token = req.header("x-token");

  if (!token) {
    return resp.status(401).json({
      msg: "Unauthorized - JWT not found",
    });
  }

  try {
    //Verificamos el token que nos envian desde los headers y extraemos el uid de la verificacion
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Buscamos el usuario a partir del uid que extraimos del jwt
    const user = await UserModel.findById(uid);

    //Validacion si usuario no existe
    if (!user) {
      return resp.status(401).json({
        msg: "User does not exists",
      });
    }

    //Verificando el status del usuario(si no ha sido dado de baja)
    if (user.status) {
      return resp.status(401).json({
        msg: "Unauthorized token - user status:true",
      });
    }

    //asignamos una nueva propiedad a la request que se llama user con el valor del usuario que encontramos en la DB
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    resp.status(401).json({
      msg: "Unauthorized - Unvalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
