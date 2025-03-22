
/**
 * Các utility function cho việc xuất dữ liệu
 */
import * as XLSX from 'xlsx';

/**
 * Xuất dữ liệu sang file CSV
 * @param headers Mảng tiêu đề cột
 * @param data Mảng dữ liệu
 * @param filename Tên file (không bao gồm phần mở rộng)
 */
export function exportToCSV(
  headers: string[],
  data: (string | number)[][],
  filename: string
): void {
  try {
    // Tạo nội dung CSV
    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');
    
    // Tạo và tải xuống file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw new Error('Không thể xuất file CSV');
  }
}

/**
 * Xuất dữ liệu sang file Excel
 * @param headers Mảng tiêu đề cột
 * @param data Mảng dữ liệu
 * @param filename Tên file (không bao gồm phần mở rộng)
 * @param sheetName Tên sheet
 */
export function exportToExcel(
  headers: string[],
  data: (string | number)[][],
  filename: string,
  sheetName: string = 'Sheet1'
): void {
  try {
    // Tạo workbook mới
    const wb = XLSX.utils.book_new();
    
    // Tạo worksheet từ dữ liệu
    const ws_data = [headers, ...data];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    
    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    
    // Xuất file
    XLSX.writeFile(wb, `${filename}.xlsx`);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw new Error('Không thể xuất file Excel');
  }
}

/**
 * Xuất dữ liệu sang file JSON
 * @param data Dữ liệu cần xuất
 * @param filename Tên file (không bao gồm phần mở rộng)
 */
export function exportToJSON(data: unknown, filename: string): void {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    
    // Tạo và tải xuống file
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting to JSON:', error);
    throw new Error('Không thể xuất file JSON');
  }
}
