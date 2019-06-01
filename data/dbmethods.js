const db = require("./dbconfig");

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  addAction,
  getActions
};

function getProjects() {
  return db("projects");
}

function getProjectById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function addProject(project) {
  return db("projects").insert(project);
}

function addAction(action) {
  return db("actions").insert(action);
}

function getActions() {
  return db("actions");
}
