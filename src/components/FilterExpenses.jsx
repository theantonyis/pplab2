import React, { useState } from 'react';


const FilterExpenses = ({ fetchFilteredExpenses, handleClear}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (startDate && endDate) {
            // Convert to ISO string format
            const formattedStartDate = new Date(startDate).toISOString();
            const formattedEndDate = new Date(endDate).toISOString();

            // Call the parent function to fetch filtered expenses
            fetchFilteredExpenses(formattedStartDate, formattedEndDate);
        } else {
            console.log('Please select both start and end dates.');
        }
    };

    const handleClearDates = () => {
        setStartDate('');  // Reset start date
        setEndDate('');    // Reset end date
        handleClear();     // Call the parent to fetch all expenses (without filter)
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit} className="flex space-x-4">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="p-2 border rounded-md mt-1"
                    />
                </div>
                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="p-2 border rounded-md mt-1"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mt-6 hover:bg-blue-600"
                >
                    Filter
                </button>
                <button
                    type="button"
                    onClick={handleClearDates}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md mt-6 ml-2 hover:bg-gray-600"
                >
                    Clear
                </button>
            </form>
        </div>
    );
};

export default FilterExpenses;
