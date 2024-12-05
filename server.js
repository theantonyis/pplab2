const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const Expense = require('./routes/expenses');
const Category = require('./routes/categories');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('build'));
dotenv.config();
const URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/expenses', Expense);
app.use('/api/categories', Category);

// MongoDB connection
mongoose.connect(URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// Socket.io
setInterval(() => {
    const costData = {
        time: new Date().toLocaleTimeString(),
        cost: Math.random() * 1000, // Simulated cost
    };
    io.emit('cost-update', costData);
}, 2000); // Every 2 seconds

// Start server
server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
