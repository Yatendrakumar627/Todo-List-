const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', todoRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/todo-list', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
