import React, {useEffect, useState} from 'react';
import axios from '../axios';

const AddExpense = ({ fetchExpenses }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExpense = { amount, category, description };
        console.log('Sending expense:', newExpense); // Add logging here
        try {
            await axios.post('/expenses', newExpense);
            fetchExpenses();
            setAmount('');
            setCategory('');
            setDescription('');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const handleAmountChange = (e) => {
        // Ensure that the amount is greater than or equal to zero
        const value = e.target.value;
        if (value > 0 || value === '') {
            setAmount(value);
        }
    };

    useEffect(() => {
        fetchCategories(); // Simply call the function without async/await
    }, []);

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-md mb-6">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                    min="0"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Add Expense
            </button>
        </form>
    );
};

export default AddExpense;
