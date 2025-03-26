
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus, Link2, AlertTriangle } from "lucide-react";

interface EmptyAccountsStateProps {
  onRefresh: () => void;
  onAddAccount?: () => void;
  botType: 'premium' | 'prop' | 'user';
}

const EmptyAccountsState: React.FC<EmptyAccountsStateProps> = ({
  onRefresh,
  onAddAccount,
  botType
}) => {
  const getBotTypeText = () => {
    switch (botType) {
      case 'premium':
        return 'Premium Bot';
      case 'prop':
        return 'Prop Bot';
      case 'user':
      default:
        return 'User Bot';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-4 border rounded-lg bg-gray-50">
      <AlertTriangle className="w-12 h-12 text-yellow-500 mb-2" />
      
      <h3 className="text-lg font-medium">Chưa có tài khoản nào được kết nối</h3>
      
      <p className="text-sm text-gray-500 max-w-md">
        Bạn chưa có tài khoản nào được kết nối với {getBotTypeText()} này. 
        Hãy thêm tài khoản để bắt đầu sử dụng Bot.
      </p>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {onAddAccount && (
          <Button onClick={onAddAccount} className="mt-2">
            <Plus className="w-4 h-4 mr-2" />
            Thêm tài khoản
          </Button>
        )}
        
        <Button variant="outline" onClick={onRefresh} className="mt-2">
          <RefreshCw className="w-4 h-4 mr-2" />
          Làm mới
        </Button>
      </div>
    </div>
  );
};

export default EmptyAccountsState;
