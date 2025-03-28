
/**
 * Utility functions for formatting data
 */

// Format currency value with locale
export function formatCurrency(value: number, currency: string = 'VND'): string {
  if (value === 0) return 'Miễn phí';
  
  try {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: currency,
      maximumFractionDigits: 0
    }).format(value);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${value.toLocaleString()} ${currency}`;
  }
}

// Format date to locale string
export function formatDate(date: string | Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  try {
    switch (format) {
      case 'short':
        return dateObj.toLocaleDateString('vi-VN');
      case 'long':
        return dateObj.toLocaleDateString('vi-VN', { 
          weekday: 'long',
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'medium':
      default:
        return dateObj.toLocaleDateString('vi-VN', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateObj.toLocaleDateString();
  }
}

// Format number with thousand separators
export function formatNumber(value: number): string {
  return value.toLocaleString('vi-VN');
}

// Format file size (bytes to KB, MB, etc.)
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
