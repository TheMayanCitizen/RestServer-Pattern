const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Password is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "USER"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//Asi evitamos que en la respuesta al frontend vayan tanto la version(__V) como el password
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id; //Cambiamos todos los _id de las responses a "uid"
  return user;
};

module.exports = model("User", UserSchema);
