const { Response, Request } = require("express");

const getUsers = (req = Request, res = Response) => {
  const { id } = req.params;
  const { q, name, hello = "It's Tim" } = req.query;

  res.json({
    message: "Hello It's Tim from get from controller",
    id,
    q,
    name,
    hello,
  });
};

const putUsers = (req, res = Response) => {
  res.json({
    message: "Hello It's Tim from put",
  });
};
const postUsers = (req, res = Responses) => {
  const { name, age } = req.body;
  res.json({
    message: "Hello It's Tim from post",
    name,
    age,
  });
};
const deleteUsers = (req, res = Response) => {
  res.json({
    message: "Hello It's Tim from delete",
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
};
