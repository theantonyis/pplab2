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

const Dashboard = ({expenses }) => {
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
};

export default Dashboard;
