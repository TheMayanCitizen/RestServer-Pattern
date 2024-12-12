const Server = require("./modules/server");

require("dotenv").config();

const server = new Server();

server.listen();
