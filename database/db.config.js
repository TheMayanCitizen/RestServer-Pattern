const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CNN);

    console.log("Successfully connected to DB");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to DB");
  }
};

module.exports = {
  connectToDB,
};
