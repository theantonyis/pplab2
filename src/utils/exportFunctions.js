import jsPDF from 'jspdf';

export const exportToCSV = (data, filename = 'report.csv') => {
    if (!Array.isArray(data) || data.length === 0) {
        console.error('Invalid data provided for CSV export');
        return;
    }

    const header = Object.keys(data[0]).join(',');  // Use the keys of the first object as the header
    const rows = data.map(row => Object.values(row).join(','));  // Convert each row to a CSV string
    const csvContent = [header, ...rows].join('\n');  // Join header and rows with newline

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

export const exportToPDF = (data, filename = 'report.pdf') => {
    if (!Array.isArray(data) || data.length === 0) {
        console.error('Invalid data provided for PDF export');
        return;
    }

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Expense Report', 14, 10);  // Title
    doc.text('--------------------', 14, 12);  // Divider

    // Create table headers
    const headers = ['Name', 'Amount', 'Category', 'Date'];
    const rows = data.map(expense => [
        expense.name || 'N/A', // Handle missing name
        expense.amount || 'N/A', // Handle missing amount
        expense.category && expense.category.name ? expense.category.name : 'N/A', // Handle missing category name
        expense.category && expense.category.description ? expense.category.description : 'N/A', // Handle missing category description
        expense.createdAt ? expense.createdAt.toString() : 'N/A' // Handle missing or invalid date
    ]);

    // Table position
    const startX = 14;
    const startY = 20;
    const rowHeight = 10;

    // Add headers to the PDF
    headers.forEach((header, index) => {
        doc.text(header, startX + (index * 40), startY);
    });

    // Add rows to the PDF
    rows.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            doc.text(cell.toString(), startX + (cellIndex * 40), startY + (rowIndex + 1) * rowHeight);
        });
    });

    // Save the PDF
    doc.save(filename);
};