const express = require("express");
const server = express();

server.listen(3000);
server.use(express.json());

const todo = [];

function ProjctTitleExists(req, res, next) {
  if (req.param.id) {
    return res.status(400).json({ menssagem: "this id not exists" });
  }

  next();
}

function IdProjectExists(req, res, next) {
  const { id } = req.params;
  const project = todo.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ menssagem: "this id not exists" });
  }

  return next();
}

server.get("/projects", (req, res) => res.json(todo));

server.get("/projects/:id", IdProjectExists, (req, res) => {
  const { id } = req.params;

  return res.json(todo[id]);
});

server.post("/projects", ProjctTitleExists, (req, res) => {
  const { title } = req.body;
  const idProjeto = todo.length;
  const project = {
    id: idProjeto,
    title,
    tasks: []
  };

  todo.push(project);
  return res.json(project);
});

server.post("/projects/:id/tasks", IdProjectExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  todo[id].tasks.push(task);

  return res.json(todo[id]);
});

server.put("/projects/:id", ProjctTitleExists, IdProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  todo[id].title = title;

  return res.json(todo[id]);
});

server.delete("/projects/:id", IdProjectExists, (req, res) => {
  const { id } = req.params;
  todo.splice(id, 1);
  return res.status(200).json({ mesagem: `Projeto de ID: ${id} foi deletado` });
});
