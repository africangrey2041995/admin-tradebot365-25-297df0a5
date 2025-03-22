import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { BotProfileTabsProps } from '@/types/admin-types';

const BotProfileTabs: React.FC<BotProfileTabsProps> = ({ botId, onAddAccount }) => {
  const [accountsData, setAccountsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Đã làm mới dữ liệu tài khoản");
    }, 1000);
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Tài khoản kết nối</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý các tài khoản được kết nối với bot
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddAccount}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm tài khoản
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin mr-2">&#8635;</span>
            ) : (
              <span className="mr-2">&#8635;</span>
            )}
            Làm mới
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {accountsData.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="mb-4">Không có tài khoản nào được kết nối với bot này</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onAddAccount}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm tài khoản
            </Button>
          </div>
        ) : (
          <div>
            {/* Accounts table would go here */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BotProfileTabs;
