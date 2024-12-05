import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

export const exportToCSV = (data, filename = 'report.csv') => {
    if (!Array.isArray(data) || data.length === 0) {
        console.error('Invalid data provided for CSV export');
        return;
    }

    const header = ['ID', 'Amount', 'Category', 'Date'];
    const escapeCSV = (value) => (typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value);

    const rows = data.map(row => [
        escapeCSV(row._id || 'N/A'),
        escapeCSV(row.amount || 'N/A'),
        escapeCSV(row.category?.name || 'N/A'),
        escapeCSV(row.createdAt ? format(new Date(row.createdAt), 'yyyy-MM-dd') : 'N/A')
    ]);

    const csvContent = [header.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });

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

    // Title
    doc.setFontSize(16);
    doc.text('Expense Report', 14, 10);

    // Table Headers and Data
    const headers = ['ID', 'Amount', 'Category', 'Date'];
    const rows = data.map(expense => [
        expense._id || 'N/A',
        expense.amount || 'N/A',
        expense.category?.name || 'N/A',
        expense.createdAt ? format(new Date(expense.createdAt), 'yyyy-MM-dd') : 'N/A'
    ]);

    autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 20, // Position table below the title
        styles: { fontSize: 10, overflow: 'linebreak', cellPadding: 3 }, // Prevent text overlap
        headStyles: { fillColor: [0, 57, 107] }, // Custom header color
    });

    doc.save(filename);
};
