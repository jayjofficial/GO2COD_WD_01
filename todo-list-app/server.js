// BACKEND (Node.js + Express)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

// Handle requests to root
app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'to-do.html'));
});

// Simulated database
let tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Walk the dog', completed: true },
];

// Create: Add a new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Read: Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Update: Modify an existing task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) return res.status(404).json({ error: 'Task not found' });

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// Delete: Remove a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.status(204).send();
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  