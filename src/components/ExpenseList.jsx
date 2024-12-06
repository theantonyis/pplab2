import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";

import { format } from 'date-fns';

const ExpenseList = ({ expenses, deleteExpense, updateExpense, categories }) => {
    const [editMode, setEditMode] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [showList, setShowList] = useState(true);

    const handleEditClick = (expense) => {
        setEditMode(true);
        setSelectedExpense({
            ...expense,
            category: expense.category._id  // Set the category as the category ID, not the whole object
        });
    };

    const handleSaveClick = () => {
        const updatedExpense = {
            ...selectedExpense,
            category: categories.find(cat => cat._id === selectedExpense.category)  // Find the full category object
        };
        updateExpense(updatedExpense._id, updatedExpense);
        setEditMode(false);
        setSelectedExpense(null);
    };

    const handleChange = (e) => {
        setSelectedExpense({ ...selectedExpense, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        setSelectedExpense({ ...selectedExpense, category: e.target.value });
    };

    const formatDate = (date) => {
        return format(new Date(date), 'yyyy-MM-dd HH:mm:ss'); // Example format: 2024-12-05 17:00:00
    };

    const toggleListVisibility = () => {
        setShowList(!showList);  // Toggle the visibility of the expense list
    };

    if (!expenses || expenses.length === 0) {
        return <p className="text-center text-gray-500">No expenses found for this period.</p>;
    }

    return (
        <div className="bg-white shadow-md p-6 rounded-md mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Expense List</h2>
                <button
                    onClick={toggleListVisibility}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {showList ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} />}
                </button>
            </div>

            {showList && (
                <ul className="space-y-4">
                    {expenses.map((expense) => (
                        <li key={expense._id} className="flex items-center justify-between border-b py-4">
                            {editMode && selectedExpense._id === expense._id ? (
                                <div className="flex flex-col space-y-3 w-full">
                                    <div className="flex space-x-3">
                                        <input
                                            type="number"
                                            name="amount"
                                            value={selectedExpense.amount}
                                            onChange={handleChange}
                                            className="p-2 border rounded-md flex-grow"
                                        />

                                        <select
                                            name="category"
                                            value={selectedExpense.category}
                                            onChange={handleCategoryChange}
                                            className="p-2 border rounded-md flex-grow"
                                        >
                                            {categories.map((category) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            type="text"
                                            name="description"
                                            value={selectedExpense.description}
                                            onChange={handleChange}
                                            className="p-2 border rounded-md flex-grow"
                                        />
                                        <button
                                            onClick={handleSaveClick}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex space-x-4 w-full items-center">
                                    <div className="flex flex-col w-2/5">
                                        <span className="font-medium text-gray-700">Amount</span>
                                        <span className="text-lg text-gray-800">{expense.amount} UAH</span>
                                    </div>
                                    <div className="flex flex-col w-2/5">
                                        <span className="font-medium text-gray-700">Category</span>
                                        <span className="text-lg text-gray-800">{expense.category.name}</span>
                                    </div>
                                    <div className="flex flex-col w-1/5">
                                        <span className="font-medium text-gray-700">Description</span>
                                        <span className="text-lg text-gray-800">{expense.description}</span>
                                    </div>
                                    <div className="flex flex-col w-1/5">
                                        <span className="font-medium text-gray-700">Date</span>
                                        <span className="text-lg text-gray-800">
                                            {formatDate(expense.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleEditClick(expense)}
                                            className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteExpense(expense._id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;
