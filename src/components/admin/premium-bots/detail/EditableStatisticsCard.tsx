
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Activity, TrendingUp, LineChart, PieChart, Pencil, Save, X } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export interface StatData {
  name: string;
  value: string;
  icon: React.ReactNode;
}

// Schema for validation
const statisticsFormSchema = z.object({
  winRate: z.string().min(1, { message: "Win rate is required" }),
  avgProfit: z.string().min(1, { message: "Average profit is required" }),
  maxDrawdown: z.string().min(1, { message: "Max drawdown is required" }),
  sharpRatio: z.string().min(1, { message: "Sharp ratio is required" }),
});

type StatisticsFormValues = z.infer<typeof statisticsFormSchema>;

interface EditableStatisticsCardProps {
  statistics: StatData[];
  onUpdate: (updatedStats: StatData[]) => void;
}

const EditableStatisticsCard: React.FC<EditableStatisticsCardProps> = ({ 
  statistics, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Create form with default values from statistics
  const form = useForm<StatisticsFormValues>({
    resolver: zodResolver(statisticsFormSchema),
    defaultValues: {
      winRate: statistics.find(s => s.name === "Win Rate")?.value || "",
      avgProfit: statistics.find(s => s.name === "Avg Profit")?.value || "",
      maxDrawdown: statistics.find(s => s.name === "Max Drawdown")?.value || "",
      sharpRatio: statistics.find(s => s.name === "Sharp Ratio")?.value || "",
    },
  });

  const toggleEdit = () => {
    if (isEditing) {
      form.reset({
        winRate: statistics.find(s => s.name === "Win Rate")?.value || "",
        avgProfit: statistics.find(s => s.name === "Avg Profit")?.value || "",
        maxDrawdown: statistics.find(s => s.name === "Max Drawdown")?.value || "",
        sharpRatio: statistics.find(s => s.name === "Sharp Ratio")?.value || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = (values: StatisticsFormValues) => {
    // Update the statistics with new values
    const updatedStats = [...statistics];
    
    // Find and update each statistic
    const winRateIndex = updatedStats.findIndex(s => s.name === "Win Rate");
    if (winRateIndex >= 0) updatedStats[winRateIndex] = { 
      ...updatedStats[winRateIndex], 
      value: values.winRate 
    };
    
    const avgProfitIndex = updatedStats.findIndex(s => s.name === "Avg Profit");
    if (avgProfitIndex >= 0) updatedStats[avgProfitIndex] = { 
      ...updatedStats[avgProfitIndex], 
      value: values.avgProfit 
    };
    
    const maxDrawdownIndex = updatedStats.findIndex(s => s.name === "Max Drawdown");
    if (maxDrawdownIndex >= 0) updatedStats[maxDrawdownIndex] = { 
      ...updatedStats[maxDrawdownIndex], 
      value: values.maxDrawdown 
    };
    
    const sharpRatioIndex = updatedStats.findIndex(s => s.name === "Sharp Ratio");
    if (sharpRatioIndex >= 0) updatedStats[sharpRatioIndex] = { 
      ...updatedStats[sharpRatioIndex], 
      value: values.sharpRatio 
    };

    onUpdate(updatedStats);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Hiệu Suất Giao Dịch</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleEdit}
          className="h-8 w-8 p-0"
        >
          {isEditing ? (
            <X className="h-4 w-4" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="winRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        Win Rate
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="avgProfit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        Avg Profit
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="maxDrawdown"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-red-500" />
                        Max Drawdown
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sharpRatio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <PieChart className="h-4 w-4 text-blue-500" />
                        Sharp Ratio
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={toggleEdit}>
                  Hủy
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {statistics.map((stat, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 dark:bg-zinc-800/50 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  {stat.icon}
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {stat.name}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditableStatisticsCard;
