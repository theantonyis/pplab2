import { format } from 'date-fns';

export const exportToCSV = (data, filename = 'report.csv') => {
    if (!Array.isArray(data) || data.length === 0) {
        console.error('Invalid data provided for CSV export');
        return;
    }

    const header = ['Amount', 'Category', 'Date'];
    const escapeCSV = (value) => (typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value);

    const rows = data.map(row => [
        escapeCSV(row.amount || 'N/A'),
        escapeCSV(row.category?.name || 'N/A'),
        escapeCSV(row.createdAt ? format(new Date(row.createdAt), 'yyyy-MM-dd') : 'N/A')
    ]);

    const csvContent = [header.join(','), ...rows.map(row => row.join(', '))].join('\n');
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};