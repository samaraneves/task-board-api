const express = require("express");
const app = express();
const port = 3000;
const tasksRouter = require("./routes/tasks");

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.use(express.json());

app.use("/", tasksRouter);

app.listen(port);
