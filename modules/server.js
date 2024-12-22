const express = require("express");
const cors = require("cors");
const { connectToDB } = require("../database/db.config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";

    //Connect to Database in Mongo
    this.connectToDB();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  async connectToDB() {
    await connectToDB();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Recibir informacion en formato Json
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userPath, require("../routes/users.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Hello from the other side: PORT ${this.port}`);
    });
  }
}

module.exports = Server;
