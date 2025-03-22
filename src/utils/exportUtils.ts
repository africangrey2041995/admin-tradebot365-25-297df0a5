
import * as XLSX from 'xlsx';

/**
 * Export data to CSV format
 * @param headers Array of column headers
 * @param data Array of data rows
 * @param filename Filename without extension
 */
export const exportToCSV = (headers: string[], data: (string | number)[][], filename: string) => {
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => row.map(cell => {
      // If the cell contains commas, quotes, or newlines, wrap it in quotes
      const cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(','))
  ].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  return true;
};

/**
 * Export data to Excel format
 * @param headers Array of column headers
 * @param data Array of data rows
 * @param filename Filename without extension
 * @param sheetName Name of the worksheet
 */
export const exportToExcel = (
  headers: string[], 
  data: (string | number)[][], 
  filename: string, 
  sheetName: string = 'Sheet1'
) => {
  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  
  // Create workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Generate Excel file and download
  XLSX.writeFile(workbook, `${filename}.xlsx`);
  
  return true;
};
