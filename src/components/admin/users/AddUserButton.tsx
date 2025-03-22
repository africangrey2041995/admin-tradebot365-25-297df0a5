
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface AddUserButtonProps {
  onClick: () => void;
}

export const AddUserButton: React.FC<AddUserButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-end">
      <Button 
        className="bg-amber-500 hover:bg-amber-600 text-white"
        onClick={onClick}
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Thêm người dùng
      </Button>
    </div>
  );
};
