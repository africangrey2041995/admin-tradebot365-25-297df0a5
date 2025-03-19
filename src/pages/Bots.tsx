
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import DashboardCard from '@/components/dashboard/DashboardCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import {
  CircuitBoard, 
  Search, 
  Plus, 
  Calendar, 
  Star, 
  MoreHorizontal, 
  Users,
  Bookmark
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Bot } from '@/types';

interface BotCardProps {
  title: string;
  subtitle?: string;
  deadline: string;
  progress: number;
  status: string;
  taskCount?: string;
  teamMembers?: string[];
  lastUpdated?: string;
  onFavorite?: () => void;
  isFavorite?: boolean;
  colorScheme?: 'red' | 'blue' | 'green' | 'purple' | 'default';
}

const BotCard = ({
  title,
  subtitle,
  deadline,
  progress,
  status,
  taskCount,
  teamMembers = [],
  lastUpdated,
  onFavorite,
  isFavorite = false,
  colorScheme = 'default'
}: BotCardProps) => {
  
  const colorClasses = {
    red: 'bg-red-50 border-red-100',
    blue: 'bg-blue-50 border-blue-100',
    green: 'bg-green-50 border-green-100',
    purple: 'bg-purple-50 border-purple-100',
    default: 'bg-white border-slate-200'
  };
  
  const statusColors = {
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800',
    'Pending': 'bg-blue-100 text-blue-800',
  };
  
  return (
    <div className={`relative rounded-lg border shadow-sm p-4 ${colorClasses[colorScheme]}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={onFavorite}
            className="text-yellow-400 hover:text-yellow-500"
          >
            <Star className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Thao Tác</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Chỉnh Sửa Bot</DropdownMenuItem>
              <DropdownMenuItem>Xem Chi Tiết</DropdownMenuItem>
              <DropdownMenuItem>Thêm Tài Khoản</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Xoá Bot</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 my-4">
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <Badge className={`mt-1 ${statusColors[status as keyof typeof statusColors] || 'bg-slate-100 text-slate-800'}`}>
            {status}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Deadline</p>
          <p className="mt-1 text-sm font-medium">{deadline}</p>
        </div>
      </div>
      
      {taskCount && (
        <div className="flex items-center mb-4 border-t border-b py-2 border-slate-200">
          <div className="flex-1">
            <p className="text-sm font-medium">Tasks</p>
          </div>
          <div className="text-sm font-medium">{taskCount}</div>
        </div>
      )}
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center">
          <p className="text-sm text-muted-foreground mr-2">Team: </p>
          <div className="flex -space-x-2">
            {teamMembers.map((member, idx) => (
              <div 
                key={idx} 
                className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium border-2 border-white"
              >
                {member.charAt(0).toUpperCase()}
              </div>
            ))}
            <button className="h-6 w-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xs font-medium border-2 border-white">
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {lastUpdated}
          </div>
        )}
      </div>
    </div>
  );
};

const Bots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    '1': true,
    '3': true
  });

  // Mock data for demonstration
  const mockBots: BotCardProps[] = [
    {
      title: 'ID BOT',
      subtitle: 'Slack brand logo design for a fintech watch',
      deadline: '18 Sep, 2021',
      progress: 50,
      status: 'In Progress',
      taskCount: '18/42',
      teamMembers: ['A', 'B', 'C'],
      lastUpdated: '10 Jul, 2021',
      colorScheme: 'red'
    },
    {
      title: 'TÊN BOT',
      subtitle: 'Redesign - Landing page',
      deadline: '10 Jun, 2021',
      progress: 95,
      status: 'Completed',
      taskCount: '22/56',
      teamMembers: ['B', 'C'],
      lastUpdated: '18 May, 2021',
      colorScheme: 'blue'
    },
    {
      title: 'MÃ TÀI VỀ BOT',
      subtitle: 'Chat Application',
      deadline: '08 Apr, 2021',
      progress: 41,
      status: 'In Progress',
      taskCount: '14/20',
      teamMembers: ['C'],
      lastUpdated: '21 Feb, 2021',
      colorScheme: 'green'
    },
    {
      title: 'Project App',
      subtitle: 'Create a project application for a project management and task management',
      deadline: '22 Nov, 2021',
      progress: 35,
      status: 'In Progress',
      taskCount: '20/34',
      teamMembers: ['A', 'B', 'C'],
      lastUpdated: '03 Aug, 2021',
      colorScheme: 'purple'
    },
    {
      title: 'Dashboard UI',
      deadline: '10 Jun, 2021',
      progress: 95,
      status: 'Completed',
      teamMembers: ['A', 'B'],
    },
    {
      title: 'Vector Images',
      deadline: '08 Apr, 2021',
      progress: 41,
      status: 'In Progress',
      teamMembers: ['C'],
    },
    {
      title: 'Authentication',
      deadline: '22 Nov, 2021',
      progress: 35,
      status: 'In Progress',
      teamMembers: ['A'],
    },
    {
      title: 'Multipurpose landing template',
      deadline: '18 Sep, 2021',
      progress: 50,
      status: 'In Progress',
      teamMembers: ['A', 'B', 'C'],
    },
  ];

  const filteredBots = mockBots.filter(bot => 
    bot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (bot.subtitle && bot.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddBot = () => {
    toast('Thêm Bot mới', {
      description: 'Tính năng này sẽ được triển khai trong phiên bản tiếp theo.',
    });
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleAddAccount = () => {
    toast('Thêm nhanh Account', {
      description: 'Tính năng thêm tài khoản nhanh sẽ được triển khai trong phiên bản tiếp theo.',
    });
  };

  return (
    <MainLayout title="Quản Lý Bot">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" className="mr-2">
              <Bookmark className="h-4 w-4 mr-2" />
              PROJECT LIST
            </Button>
            <h2 className="text-xl font-bold text-primary">BOT Trading</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddBot}>
              <Plus className="h-4 w-4 mr-2" />
              Add New BOT
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {filteredBots.slice(0, 4).map((bot, index) => (
            <BotCard 
              key={index} 
              {...bot} 
              isFavorite={favorites[index] || false}
              onFavorite={() => toggleFavorite(index)}
            />
          ))}
        </div>

        <div className="flex items-center mb-6">
          <h3 className="text-lg font-semibold">Add nhanh Account</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-3 bg-primary/10"
            onClick={handleAddAccount}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {filteredBots.slice(4).map((bot, index) => (
            <BotCard 
              key={index + 4} 
              {...bot} 
              isFavorite={favorites[index + 4] || false}
              onFavorite={() => toggleFavorite(index + 4)}
            />
          ))}
        </div>

        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </MainLayout>
  );
};

export default Bots;
