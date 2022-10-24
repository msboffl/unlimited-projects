const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
// routes
app.get("/hello", (req, res) => {
  res.send("Hello Task Manager");
});

// app.get('/api/v1/tasks')           - Get all tasks
app.use("/api/v1/tasks", tasks);

// app.post('/api/v1/tasks')          - Create new task
// app.get('/api/v1/tasks/:id')       - Get a single tasks
// app.patch('/api/v1/tasks/:id')     - Update a single tasks
// app.delete('/api/v1/tasks/:id')    - Delete a single tasks

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running at PORT: ${PORT}....`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
