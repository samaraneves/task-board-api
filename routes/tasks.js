const express = require("express");
const router = express.Router();
const tasks = require("../services/tasks");

router.get("/all", function (req, res, next) {
  try {
    res.json(tasks.getAllTasks(req.query.page));
  } catch (err) {
    console.error(`Error while getting tasks `, err.message);
    next(err);
  }
});

router.post("/task", function (req, res, next) {
  try {
    res.json(tasks.createTask(req.body));
  } catch (err) {
    console.error(`Error while adding tasks `, err.message);
    next(err);
  }
});

router.delete("/task/:id", function (req, res, next) {
  try {
    res.json(tasks.deleteTask(req.body));
  } catch (err) {
    console.error(`Error while deleting tasks `, err.message);
    next(err);
  }
});

router.put("/task/:id/update", function (req, res, next) {
  try {
    res.json(tasks.updateTask(req.body));
  } catch (err) {
    console.error(`Error while update tasks `, err.message);
    next(err);
  }
});

module.exports = router;
