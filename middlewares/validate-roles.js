const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "You must validate token before role",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN") {
    return res.status(401).json({
      msg: "Unauthorized role - must be an ADMIN",
    });
  }

  next();
};

//Validamos si cuenta con alguno de los roles que pasemos por parametro en el middleware de la ruta
const hasRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "You must validate token before role",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(500).json({
        msg: `Your role must be included in one of these ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRoles,
};
