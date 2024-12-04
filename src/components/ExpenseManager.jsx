// src/components/ExpenseManager.js
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import FilterExpenses from './FilterExpenses';

const ExpenseManager = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const fetchCategories = () => {
        axios.get('/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    };

    const fetchExpenses = () => {
        axios.get('/expenses')
            .then((response) => {
                const fetchedExpenses = response.data;
                setExpenses(response.data);
                setTotalAmount(fetchedExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0));
            })
            .catch((error) => {
                console.error('Error fetching expenses:', error);
            });
    };

    const fetchFilteredExpenses = (startDate, endDate, category) => {
        console.log("Filtering expenses with", startDate, endDate, category);
        axios.get('/expenses/filter', { params: { startDate, endDate, category } })
            .then((response) => {
                console.log('Filtered Expenses Response:', response.data);
                const filteredExpenses = response.data.expenses;
                setExpenses(filteredExpenses);
                setTotalAmount(response.data.totalAmount); // Set the total amount from the response
            })
            .catch((error) => {
                console.error('Error filtering expenses:', error);
            });
    };

    // Delete an expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`/expenses/delete/${id}`);
            setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    // Update an expense
    const updateExpense = async (id, updatedExpense) => {
        try {
            const response = await axios.put(`/expenses/edit/${id}`, updatedExpense);
            const updatedExpenses = expenses.map((expense) =>
                expense._id === id ? response.data : expense
            );
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    const handleClear = () => {
        fetchExpenses(); // Fetch all expenses without filter
    };

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Expense Manager</h1>

            {/* Display Total Amount */}
            <div className="mb-4 text-lg font-medium">
                <span>Total Expenses: </span>
                <span className="text-blue-600">{totalAmount} UAH</span>
            </div>

            <FilterExpenses
                fetchFilteredExpenses={fetchFilteredExpenses}
                handleClear={handleClear}
                categories={categories}
            />

            <AddExpense fetchExpenses={fetchExpenses}/>
            <ExpenseList
                expenses={expenses}
                deleteExpense={deleteExpense}
                updateExpense={updateExpense}
                categories={categories}
            />
        </div>
    );
};

export default ExpenseManager;
