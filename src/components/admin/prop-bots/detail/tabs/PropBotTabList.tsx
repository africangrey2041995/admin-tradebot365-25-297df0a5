
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, List, Activity, Users, Cog } from 'lucide-react';

const PropBotTabList: React.FC = () => {
  return (
    <TabsList className="grid w-full grid-cols-5">
      <TabsTrigger value="overview">
        <BarChart2 className="h-4 w-4 mr-2" />
        Tổng quan
      </TabsTrigger>
      <TabsTrigger value="connected-accounts">
        <List className="h-4 w-4 mr-2" />
        Tài khoản kết nối
      </TabsTrigger>
      <TabsTrigger value="coinstrat-logs">
        <Activity className="h-4 w-4 mr-2" />
        Prop Trading Logs
      </TabsTrigger>
      <TabsTrigger value="users">
        <Users className="h-4 w-4 mr-2" />
        Người dùng
      </TabsTrigger>
      <TabsTrigger value="settings">
        <Cog className="h-4 w-4 mr-2" />
        Cài đặt
      </TabsTrigger>
    </TabsList>
  );
};

export default PropBotTabList;
