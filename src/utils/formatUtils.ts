
/**
 * Format a number as currency.
 * 
 * @param amount - The amount to format
 * @param currency - The currency code (e.g. 'USD', 'VND')
 * @param options - Additional formatting options
 * @returns The formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency = 'VND',
  options?: Intl.NumberFormatOptions
): string => {
  if (amount === 0) return 'Miễn phí';
  
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    // For Vietnamese currency, use a custom formatter
    if (currency === 'VND') {
      return new Intl.NumberFormat('vi-VN', mergedOptions).format(amount);
    }
    
    // For other currencies, use the default formatter
    return new Intl.NumberFormat('en-US', mergedOptions).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${amount.toLocaleString()} ${currency}`;
  }
};

/**
 * Format a date string to a localized date string.
 * 
 * @param dateString - The date string to format
 * @param locale - The locale to use (default: 'vi-VN')
 * @param options - Additional formatting options
 * @returns The formatted date string
 */
export const formatDate = (
  dateString: string,
  locale = 'vi-VN',
  options?: Intl.DateTimeFormatOptions
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, mergedOptions).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a number as percentage.
 * 
 * @param value - The value to format as percentage
 * @param options - Additional formatting options
 * @returns The formatted percentage string
 */
export const formatPercent = (
  value: number,
  options?: Intl.NumberFormatOptions
): string => {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    return new Intl.NumberFormat('vi-VN', mergedOptions).format(value / 100);
  } catch (error) {
    console.error('Error formatting percentage:', error);
    return `${value}%`;
  }
};
