
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface TabContentWrapperProps {
  title: string;
  description: string;
  onRefresh?: () => void;
  refreshLoading?: boolean;
  children: React.ReactNode;
}

const TabContentWrapper: React.FC<TabContentWrapperProps> = ({
  title,
  description,
  onRefresh,
  refreshLoading = false,
  children
}) => {
  return (
    <Card className="border border-border bg-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            disabled={refreshLoading}
            onClick={onRefresh}
          >
            {refreshLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Làm mới
          </Button>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default TabContentWrapper;
