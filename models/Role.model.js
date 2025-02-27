const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "Invalid Role"],
  },
});

module.exports = model("Role", RoleSchema);
