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

server.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getProjectById = await db.getProjectById(id);
    if (getProjectById) {
      const getActionsByProjectId = await db
        .getActions()
        .where({ project_id: id });

      const newArr = getActionsByProjectId.map(obj => {
        const actions = {
          id: obj.id,
          description: obj.description,
          notes: obj.notes,
          completed: obj.completed
        };
        return actions;
      });

      const getProjectsAndActions = {
        id: id,
        name: getProjectById.name,
        description: getProjectById.description,
        completed: getProjectById.completed,
        actions: newArr
      };
      res.status(200).json(getProjectsAndActions);
    } else {
      res.status(404).json({ error: "Specified project ID does not exist." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong with this request. 500 Error." });
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

server.get("/actions", async (req, res) => {
  try {
    const getActions = await db.getActions();
    if (getActions) {
      res.status(200).json(getActions);
    } else {
      res
        .status(400)
        .json({ error: "Something went wrong with retrieving the actions." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong with this request. Error 500." });
  }
});

server.post("/actions", async (req, res) => {
  try {
    const addAction = await db.addAction(req.body);
    if (addAction) {
      res.status(201).json(addAction);
    } else {
      res
        .status(400)
        .json({ message: "Something went wrong with adding an action" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong with this request. Error 500." });
  }
});

module.exports = server;
