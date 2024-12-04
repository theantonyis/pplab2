const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true},
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
