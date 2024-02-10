const db = require("../services/db");
const config = require("../config");

function getAllTasks(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM tasks LIMIT ?,?`, [
    offset,
    config.listPerPage,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

function validateCreate(task) {
  let messages = [];

  console.log(task);

  if (!task) {
    messages.push("No object is provided");
  }

  if (!task.name) {
    messages.push("Name is empty");
  }

  if (!task.description) {
    messages.push("Description is empty");
  }

  if (!task.icon) {
    messages.push("Icon is empty");
  }

  if (!task.status) {
    messages.push("Status is empty");
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function createTask(taskObj) {
  validateCreate(taskObj);
  const { name, description, icon, status } = taskObj;

  const result = db.run(
    "INSERT INTO tasks (name, description, icon, status) VALUES (@name, @description, @icon, @status)",
    { name, description, icon, status }
  );

  let message = "Error in creating task";

  if (result.changes) {
    message = "Task created successfully";
  }

  return { message };
}

function deleteTask(taskObj) {
  const { id: $id } = taskObj;

  const result = db.run(`DELETE FROM tasks WHERE id = ${$id}`, {
    $id,
  });

  let message = "Error in delete task";

  if (result.changes) {
    message = "Task delete successfully";
  }

  return { message };
}

function updateTask(taskObj) {
  const { id, name, description, icon, status } = taskObj;

  console.log();
  const result = db.run(
    `UPDATE tasks SET name = ?, description = ?, icon = ?, status = ? WHERE id = ?`,
    [name, description, icon, status, id]
  );

  let message = "Error in update task";

  if (result.changes) {
    message = "Task in update successfully";
  }

  return { message };
}

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};
