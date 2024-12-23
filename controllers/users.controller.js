const { Response, Request } = require("express");
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");

/* const getUsers = (req = Request, res = Response) => {
  const { id } = req.params;
  const { q, name, hello = "It's Tim" } = req.query;

  res.json({
    message: "Hello It's Tim from get from controller",
    id,
    q,
    name,
    hello,
  });
}; */

const getUsers = async (req = Request, res = Response) => {
  const { limit = 5, from = 0 } = req.query;

  const users = UserModel.find().skip(+from).limit(+limit);

  // const total = await UserModel.countDocuments(); //Cuenta todos los documentos
  const total = UserModel.countDocuments({ status: true }); //Cuenta los docs con estatus en true

  const [usersRes, totalResp] = await Promise.all([users, total]);
  res.json({
    message: "Hello It's Tim from get from controller",
    totalResp,
    usersRes,
  });
};
const putUsers = async (req, res = Response) => {
  const { id } = req.params;
  //En rest, agrupamos los datos que queremos actualizar, los otros valores son los que no debemos actualizar o se neceitan validaciones especificas para ellos.
  const { _id, email, google, password, ...rest } = req.body;

  if (password) {
    //si viene el password signiica que el usuario quiere actualizarla
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await UserModel.findByIdAndUpdate(id, rest);

  res.json({
    message: "Hello It's Tim from put",
    user,
  });
};

const postUsers = async (req, res = Responses) => {
  const { name, email, password, role } = req.body;
  const user = new UserModel({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  res.json({
    user,
  });
};

const deleteUsers = async (req, res = Response) => {
  const { id } = req.params;

  //Como no se debe hacer un delete
  // const user = await UserModel.findByIdAndDelete(id)

  //COMO SI SE DEBE HACER
  const user = await UserModel.findByIdAndUpdate(id, { status: false });

  //Accediendo a la propiedad user que agregamos a la request en el validate-jwt.js
  const userAuth = req.user;

  res.json({
    message: "Hello It's Tim from delete",
    user,
    userAuth,
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
};
