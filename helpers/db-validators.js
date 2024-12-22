const RoleModel = require("../models/Role.model");
const UserModel = require("../models/User.model");

const validateRole = async (role = "") => {
  const validRole = await RoleModel.findOne({ role });
  if (!validRole) {
    throw new Error("Role is not registered in DB");
  }
};

const emailExist = async (email = "") => {
  const emailFound = await UserModel.findOne({ email });
  if (emailFound) {
    throw new Error("Email already exist");
  }
};

const userExists = async (id) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
};

module.exports = {
  validateRole,
  emailExist,
  userExists,
};
