import React from 'react';
import { exportToCSV, exportToPDF } from '../utils/exportFunctions';

const ReportExport = ({expenses}) => {

    const handleExportCSV = () => {
        if (expenses.length > 0) {
            exportToCSV(expenses);
        } else {
            console.log('No data available for export');
        }
    };

    const handleExportPDF = () => {
        if (expenses.length > 0) {
            exportToPDF(expenses);
        } else {
            console.log('No data available for export');
        }
    };

    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Export Report</h2>

            <div className="flex space-x-4">
                <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2 ml-2"
                >
                    Export as CSV
                </button>

                <button
                    onClick={handleExportPDF}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2 ml-2"
                >
                    Export as PDF
                </button>
            </div>
        </div>
    );
};

export default ReportExport;
