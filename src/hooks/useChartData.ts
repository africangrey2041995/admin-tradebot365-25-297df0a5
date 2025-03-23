
import { useState, useCallback } from 'react';

interface ChartData {
  [key: string]: any;
}

interface UseChartDataReturn {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  chartData: ChartData[];
  generateChartData: () => ChartData[];
}

const monthlyPerformance = [
  { month: 'Jan', value: 12.5 },
  { month: 'Feb', value: 8.3 },
  { month: 'Mar', value: -2.1 },
  { month: 'Apr', value: 5.7 },
  { month: 'May', value: 15.2 },
  { month: 'Jun', value: 10.1 },
  { month: 'Jul', value: 5.5 },
  { month: 'Aug', value: -3.2 },
  { month: 'Sep', value: 9.8 },
  { month: 'Oct', value: 18.5 },
  { month: 'Nov', value: 0 },
  { month: 'Dec', value: 0 },
];

const weeklyPerformance = [
  { day: 'Mon', value: 5.7 },
  { day: 'Tue', value: 7.3 },
  { day: 'Wed', value: -2.1 },
  { day: 'Thu', value: 4.2 },
  { day: 'Fri', value: 8.5 },
  { day: 'Sat', value: 2.1 },
  { day: 'Sun', value: 3.8 }
];

const yearlyPerformance = [
  { year: '2020', value: 28.5 },
  { year: '2021', value: 42.3 },
  { year: '2022', value: 37.8 },
  { year: '2023', value: 125.4 }
];

export const useChartData = (): UseChartDataReturn => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");

  const generateChartData = useCallback(() => {
    if (selectedPeriod === "month") {
      return monthlyPerformance;
    } else if (selectedPeriod === "week") {
      return weeklyPerformance;
    } else {
      return yearlyPerformance;
    }
  }, [selectedPeriod]);

  return {
    selectedPeriod,
    setSelectedPeriod,
    chartData: generateChartData(),
    generateChartData
  };
};
