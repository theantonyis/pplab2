import React, { useState } from 'react';

const ExpenseList = ({ expenses, deleteExpense, updateExpense }) => {
    const [editMode, setEditMode] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const handleEditClick = (expense) => {
        setEditMode(true);
        setSelectedExpense(expense);
    };

    const handleSaveClick = () => {
        updateExpense(selectedExpense._id, selectedExpense);
        setEditMode(false);
        setSelectedExpense(null);
    };

    const handleChange = (e) => {
        setSelectedExpense({ ...selectedExpense, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <ul className="space-y-4">
                {expenses.map((expense) => (
                    <li key={expense._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm">
                        {editMode && selectedExpense._id === expense._id ? (
                            <>
                                <input
                                    type="text"
                                    name="category"
                                    value={selectedExpense.category}
                                    onChange={handleChange}
                                    className="p-2 border rounded-md mr-2"
                                />
                                <input
                                    type="number"
                                    name="amount"
                                    value={selectedExpense.amount}
                                    onChange={handleChange}
                                    className="p-2 border rounded-md mr-2"
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={selectedExpense.description}
                                    onChange={handleChange}
                                    className="p-2 border rounded-md mr-2"
                                />
                                <button
                                    onClick={handleSaveClick}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="font-medium">{expense.category}</span>
                                <span>${expense.amount}</span>
                                <span className="text-gray-600">{expense.description}</span>
                                <div>
                                    <button
                                        onClick={() => handleEditClick(expense)}
                                        className="mr-2 px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
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
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
