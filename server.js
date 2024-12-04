const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Expense = require('./routes/expenses');
const Category = require('./routes/categories');

const app = express();
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

// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
