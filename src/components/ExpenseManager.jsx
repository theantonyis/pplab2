// src/components/ExpenseManager.js
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';

const ExpenseManager = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

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
                setExpenses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching expenses:', error);
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

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Expense Manager</h1>
            <AddExpense fetchExpenses={fetchExpenses} />
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
