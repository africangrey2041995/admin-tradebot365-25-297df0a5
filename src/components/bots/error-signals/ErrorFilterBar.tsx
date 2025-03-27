
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  BarChart3,
  ChevronDown,
  Clock,
  Database,
  Key,
  Search,
  ServerCrash,
  DollarSign,
  Webhook
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ErrorFilterBarProps {
  onFilterChange: (filters: {
    severity: string;
    category: string;
    timeRange: string;
  }) => void;
  currentFilters: {
    severity: string;
    category: string;
    timeRange: string;
  };
  errorCount: number;
}

const ErrorFilterBar: React.FC<ErrorFilterBarProps> = ({
  onFilterChange,
  currentFilters,
  errorCount
}) => {
  // Define severity options
  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical', color: 'text-red-500' },
    { value: 'high', label: 'High', color: 'text-orange-500' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
    { value: 'low', label: 'Low', color: 'text-blue-500' }
  ];

  // Define category options
  const categoryOptions = [
    { value: 'all', label: 'All Categories', icon: AlertTriangle },
    { value: 'AUTH', label: 'Authentication', icon: Key },
    { value: 'TRADING', label: 'Trading', icon: DollarSign },
    { value: 'INTEGRATION', label: 'Integration', icon: Webhook },
    { value: 'SYSTEM', label: 'System', icon: ServerCrash },
    { value: 'TIME', label: 'Timeout', icon: Clock },
    { value: 'CONN', label: 'Connection', icon: Database }
  ];

  // Define time range options
  const timeRangeOptions = [
    { value: 'day', label: 'Last 24 Hours' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' }
  ];
  
  const handleClearFilters = () => {
    onFilterChange({
      severity: 'all',
      category: 'all',
      timeRange: 'week'
    });
  };

  const isFiltered = 
    currentFilters.severity !== 'all' || 
    currentFilters.category !== 'all';

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-1 flex-wrap gap-2">
            {/* Severity Filter */}
            <Select
              value={currentFilters.severity}
              onValueChange={(value) => onFilterChange({ ...currentFilters, severity: value })}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                {severityOptions.map(option => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className={option.color}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={currentFilters.category}
              onValueChange={(value) => onFilterChange({ ...currentFilters, category: value })}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map(option => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-2" />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            {/* Time Range Filter */}
            <Select
              value={currentFilters.timeRange}
              onValueChange={(value) => onFilterChange({ ...currentFilters, timeRange: value })}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {timeRangeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isFiltered && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9" 
                onClick={handleClearFilters}
              >
                Reset
              </Button>
            )}
          </div>

          <div className="flex items-center">
            <Badge variant="outline" className="h-9 px-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="font-mono">{errorCount}</span> errors
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorFilterBar;
