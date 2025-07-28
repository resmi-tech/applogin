const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const USER = { username: "test", password: "1234", token: "abcd1234" };

let todos = [];
let currentId = 1;

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    res.json({ token: USER.token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${USER.token}`) return next();
  res.status(401).json({ error: "Unauthorized" });
}

// CRUD routes
app.get("/todos", auth, (req, res) => res.json(todos));

app.post("/todos", auth, (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text required" });
  const newTodo = { id: currentId++, text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", auth, (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const todo = todos.find((t) => t.id == id);
  if (!todo) return res.status(404).json({ error: "Not found" });
  todo.text = text;
  res.json(todo);
});

app.delete("/todos/:id", auth, (req, res) => {
  todos = todos.filter((t) => t.id != req.params.id);
  res.status(204).send();
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
}

module.exports = app;
