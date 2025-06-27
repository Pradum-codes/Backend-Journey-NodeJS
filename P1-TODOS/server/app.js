const express = require('express');
const app = express();
const userRoutes = require('./route/user.route.js');
const taskRoutes = require('./route/task.route.js');
const connectDB = require('./db/connect.db.js');

const startServer = async () => {
  try {
    await connectDB();
    app.use(express.json());
    app.use("/user", userRoutes);
    app.use("/task", taskRoutes);
    app.post('/test', (req, res) => {
      res.send("Test route working");
    });
    app.get('/__debug', (req, res) => res.send('debug OK'));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();