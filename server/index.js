const express = require('express');
const connectToMonog = require('./db/dbConnection');
const authRoutes = require('./routes/Auth');
const taskRoutes = require('./routes/Tasks');
const cors = require('cors');
const app = express();
connectToMonog();

app.use(express.json());
 app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => {
  console.log('Now listening to port 5000');
});
