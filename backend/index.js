const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
  };
  todos.push(todo);
  res.json(todo);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
