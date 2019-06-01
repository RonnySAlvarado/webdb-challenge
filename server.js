const express = require("express");
const server = express();
const helmet = require("helmet");
const db = require("./data/dbmethods");

server.use(helmet());
server.use(express.json());

server.get("/projects", async (req, res) => {
  try {
    const getProjects = await db.getProjects();
    if (getProjects) {
      res.status(200).json(getProjects);
    } else {
      res
        .status(400)
        .json({ message: "Something went wrong with retrieving project list" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong with this request. Error 500." });
  }
});

server.post("/projects", async (req, res) => {
  try {
    const addProject = await db.addProject(req.body);
    if (addProject) {
      res.status(201).json(addProject);
    } else {
      res
        .status(400)
        .json({ error: "Something went wrong with adding a project" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong with this request. Error 500." });
  }
});

module.exports = server;
