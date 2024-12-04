const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

router.use(express.json());

// Create a new expense
router.post('/', async (req, res) => {
    console.log("Received request to add expense");
    try {
        const { amount, category, description } = req.body;
        const newExpense = new Expense({
            amount,
            category,
            description
        });

        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        console.error('Error adding expense:', error); // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
});

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an expense
router.put('/api/expenses/edit/:id', async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an expense
router.delete('/api/expenses/delete/:id', async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
