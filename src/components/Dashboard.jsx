import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

const Dashboard = ({ data, options, expenses }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Real-Time Costs',
                data: [],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    });
    // const [filters, setFilters] = useState({ startDate: '', endDate: '', category: '' });
    // const [newExpense, setNewExpense] = useState({ amount: '', category: '', description: '' });

    // useEffect(() => {
    //     fetchData();
    // }, [filters]); // Trigger fetchData whenever filters change

    // useEffect(() => {
    //     socket.on('cost-update', (update) => {
    //         // Update the chart with new data received
    //         setChartData((prevData) => ({
    //             labels: [...prevData.labels, update.time],
    //             datasets: [
    //                 {
    //                     ...prevData.datasets[0],
    //                     data: [...prevData.datasets[0].data, update.cost],
    //                 },
    //             ],
    //         }));
    //     });
    //
    //     return () => {
    //         socket.off('cost-update'); // Clean up the socket connection
    //     };
    // }, []);
    //
    // const handleFilterChange = (e) => {
    //     const { name, value } = e.target;
    //     setFilters({ ...filters, [name]: value });
    // };

    // const fetchData = () => {
    //     axios
    //         .get('/expenses/filter', { params: filters })
    //         .then((response) => {
    //             const { expenses } = response.data;
    //
    //             // Prepare data for the chart
    //             const labels = expenses.map((expense) =>
    //                 new Date(expense.createdAt).toLocaleDateString()
    //             );
    //             const data = expenses.map((expense) => expense.amount);
    //
    //             // Update chart data
    //             setChartData({
    //                 labels: labels,
    //                 datasets: [
    //                     {
    //                         label: 'Expenses',
    //                         data: data,
    //                         borderColor: 'rgba(75,192,192,1)',
    //                         backgroundColor: 'rgba(75,192,192,0.2)',
    //                         tension: 0.4,
    //                         fill: true,
    //                     },
    //                 ],
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching expenses:', error);
    //         });
    // };

    // const handleAddExpense = (e) => {
    //     e.preventDefault();
    //
    //     axios
    //         .post('/api/expenses', newExpense)
    //         .then((response) => {
    //             // After adding the expense, re-fetch the data
    //             fetchData();
    //             // Optionally, emit the new expense to the socket
    //             socket.emit('new-expense', response.data); // Emitting event if needed for real-time updates
    //         })
    //         .catch((error) => {
    //             console.error('Error adding expense:', error);
    //         });
    // };
    //
    // const applyFilters = () => {
    //     fetchData(); // Re-fetch data with the updated filters
    // };

    useEffect(() => {
        // Prepare data for the chart
        const labels = expenses.map(expense => new Date(expense.createdAt).toLocaleDateString());
        const data = expenses.map(expense => expense.amount);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Expenses',
                    data: data,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    tension: 0.4,
                    fill: true,
                },
            ],
        });
    }, [expenses]); // The chart will update whenever the expenses change

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: { display: true, text: 'Date' },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
            },
            y: {
                type: 'linear',
                title: { display: true, text: 'Amount (₴)' },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-700">Dashboard - Expenses</h1>
            </div>

            <div className="w-full h-96">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );



    // return (
    //
    //
    //         {/* Filter Panel */}
    //         <div className="flex space-x-4 mb-6">
    //             <div className="w-1/3">
    //                 <input
    //                     type="date"
    //                     name="startDate"
    //                     onChange={handleFilterChange}
    //                     value={filters.startDate}
    //                     className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                 />
    //             </div>
    //             <div className="w-1/3">
    //                 <input
    //                     type="date"
    //                     name="endDate"
    //                     onChange={handleFilterChange}
    //                     value={filters.endDate}
    //                     className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                 />
    //             </div>
    //             <div className="w-1/3">
    //                 <input
    //                     type="text"
    //                     name="category"
    //                     onChange={handleFilterChange}
    //                     value={filters.category}
    //                     placeholder="Category"
    //                     className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                 />
    //             </div>
    //         </div>
    //         <div className="flex justify-end mb-4">
    //             <button
    //                 onClick={applyFilters}
    //                 className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //             >
    //                 Apply Filters
    //             </button>
    //         </div>
    //
    //         {/* Chart Area */}
    //         <div className="relative h-96 w-full mb-6">
    //             <Line data={chartData} options={chartOptions} />
    //         </div>
    //
    //         {/* Footer or additional actions */}
    //         <div className="flex justify-end">
    //             <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
    //                 Export Data
    //             </button>
    //         </div>
    //     </div>
    // );
};

export default Dashboard;
