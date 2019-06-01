const express = require("express");
const server = express();
const helmet = require("helmet");

server.use(helmet());
server.use(express.json());

server.get("/", async (req, res) => {
  console.log("Get request working");
});

module.exports = server;
